import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { TypingIndicator } from "./components/TypingIndicator";
import { SendIcon } from "./components/SendIcon";
import { Sidebar } from "./components/Sidebar";
import { CharacterSwitchDialog } from "./components/CharacterSwitchDialog";
import { Message, Character, CharacterType } from "./types/Character";
import { getDefaultCharacter, getCharacter, getCharacterById } from "./data/characters";
import { getCharacterIntroduction, getResponseWithTiming } from "./utils/responseGenerator";
import { ThemeProvider, useThemeClasses, useTheme } from "./contexts/ThemeContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { chatService } from "./services/chatService";
import { useAuth } from "./contexts/AuthContext";
import { AuthPage } from "./components/auth/AuthPage";


// Development debug utility
const DEBUG = process.env.NODE_ENV === 'development';
const debugLog = (...args: any[]): void => {
  if (DEBUG) {
    console.log('[Inner-Voice Debug]', ...args);
  }
};

function AppContent(): JSX.Element {
  const themeClasses = useThemeClasses();
  const { settings } = useTheme();
  const { isAuthenticated, isLoading: authLoading, user, logout } = useAuth();

  // Character state management
  const [currentCharacter, setCurrentCharacter] = useState<Character>(getDefaultCharacter());

  // Safe character resolution helper - memoized to prevent recalculation
  const getValidCharacter = useMemo(() => {
    return (characterId?: string): Character => {
      if (!characterId) return currentCharacter;

      // Use getCharacterById which safely returns undefined for invalid IDs
      const foundCharacter = getCharacterById(characterId);
      return foundCharacter || currentCharacter;
    };
  }, [currentCharacter]);

  // Initialize with character-specific introduction
  const [messages, setMessages] = useState<Message[]>(() => {
    const defaultChar = getDefaultCharacter();
    const intro = getCharacterIntroduction(defaultChar);
    return [
      {
        id: "1",
        text: intro.text,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        characterId: defaultChar.id,
        category: intro.category
      }
    ];
  });

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [useRealAPI, setUseRealAPI] = useState(true); // Toggle for using real API vs mock

  // Dialog state for character switching warning
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [pendingCharacterType, setPendingCharacterType] = useState<CharacterType | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Character switching function - shows warning dialog first - wrapped in useCallback
  const handleCharacterChange = useCallback((characterType: CharacterType): void => {
    debugLog('handleCharacterChange called with:', characterType, 'current:', currentCharacter.id);

    // Don't show dialog if switching to the same character
    if (characterType === currentCharacter.id) {
      debugLog('Same character selected, no change needed');
      return;
    }

    debugLog('Showing switch dialog for character transition');
    // Show warning dialog and store pending character
    setPendingCharacterType(characterType);
    setShowSwitchDialog(true);
  }, [currentCharacter.id]);

  // Function to actually perform the character switch with conversation reset
  const confirmCharacterSwitch = async () => {
    if (!pendingCharacterType) return;

    const newCharacter = getCharacter(pendingCharacterType);
    setCurrentCharacter(newCharacter);
    setIsTyping(false); // Stop typing indicator when switching

    try {
      if (useRealAPI) {
        // Use API to get personalized introduction from OpenAI
        debugLog('Switching character via API:', { newCharacter: pendingCharacterType });

        const switchResponse = await chatService.switchCharacter(
          pendingCharacterType,
          true // reset conversation
        );

        const introMessage: Message = {
          id: `intro-${Date.now()}`,
          text: switchResponse.introduction_message.text,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          characterId: newCharacter.id,
          category: switchResponse.introduction_message.category
        };

        // Clear previous conversation and start fresh with new character's intro
        setMessages([introMessage]);
        debugLog('Character switched successfully');
      } else {
        // Fallback to local introduction
        const intro = getCharacterIntroduction(newCharacter);
        const introMessage: Message = {
          id: `intro-${Date.now()}`,
          text: intro.text,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          characterId: newCharacter.id,
          category: intro.category
        };

        // Clear previous conversation and start fresh with new character's intro
        setMessages([introMessage]);
      }
    } catch (error) {
      console.error('Error switching character:', error);
      // Fallback to local introduction on error
      const intro = getCharacterIntroduction(newCharacter);
      const introMessage: Message = {
        id: `intro-${Date.now()}`,
        text: intro.text,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        characterId: newCharacter.id,
        category: intro.category
      };
      setMessages([introMessage]);
    }

    // Close dialog and clear pending state
    setShowSwitchDialog(false);
    setPendingCharacterType(null);
  };

  // Function to cancel character switch - wrapped in useCallback
  const cancelCharacterSwitch = useCallback(() => {
    setShowSwitchDialog(false);
    setPendingCharacterType(null);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userInput,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev: Message[]) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      if (useRealAPI) {
        // Use real API to get OpenAI response
        debugLog('Sending message to API:', { characterId: currentCharacter.id, message: userInput });

        const apiResponse = await chatService.sendMessage(
          currentCharacter.id as CharacterType,
          userInput,
          sessionId
        );

        // Update session ID if we got a new one
        if (apiResponse.session_id && apiResponse.session_id !== sessionId) {
          setSessionId(apiResponse.session_id);
          debugLog('Session ID updated:', apiResponse.session_id);
        }

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: apiResponse.response.text,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          characterId: currentCharacter.id,
          category: apiResponse.response.category
        };

        debugLog('Received API response:', { responseTime: apiResponse.response_time_ms, category: apiResponse.response.category });
        setMessages((prev: Message[]) => [...prev, aiResponse]);
      } else {
        // Fallback to mock responses (for testing without backend)
        const characterResponse = await getResponseWithTiming(currentCharacter, userInput);

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: characterResponse.text,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          characterId: currentCharacter.id,
          category: characterResponse.category
        };
        setMessages((prev: Message[]) => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      // Fallback response on error
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I'm having trouble connecting right now. ${useRealAPI ? 'Please make sure the backend server is running.' : 'Please try again!'}`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        characterId: currentCharacter.id,
        category: "supportive"
      };
      setMessages((prev: Message[]) => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, currentCharacter, sessionId, useRealAPI]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Handler function for sidebar - wrapped in useCallback
  const handleToggleCollapse = useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed);
  }, [sidebarCollapsed]);

  // Auto-scroll to bottom when new messages are added - optimized to use length
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  // Handle logout
  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Inner Voice...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div
      className={`min-h-screen h-screen max-h-screen flex overflow-hidden nature-theme-transition nature-background-crossfade bg-layered ${themeClasses.primaryBg}`}
      style={{
        background: `
          var(--nature-texture-lighting),
          var(--nature-texture-layer3),
          var(--nature-texture-layer2),
          var(--nature-texture-layer1),
          var(--nature-gradient-primary)
        `,
        backgroundSize: 'cover, cover, cover, cover, cover',
        backgroundPosition: 'center, center, center, center, center',
        backgroundBlendMode: 'soft-light, overlay, normal, normal, normal'
      }}
    >
      {/* Grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          background: 'var(--nature-texture-grain)',
          mixBlendMode: 'overlay',
          zIndex: 0
        }}
      />
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? 'w-20' : 'w-80'} flex-shrink-0 border-r ${themeClasses.cardBorder} nature-theme-transition nature-theme-stagger-1 ${themeClasses.sidebarBg} overflow-hidden glass-panel-strong relative z-10`}
        style={{
          background: `${themeClasses.natureStyle.sidebarBackground}`,
          backdropFilter: 'blur(16px) saturate(180%)',
          boxShadow: 'var(--nature-shadow)'
        }}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          currentCharacter={currentCharacter}
          onCharacterChange={handleCharacterChange}
        />
      </div>

      {/* Main Chat Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 ${themeClasses.chatAreaBg} nature-theme-transition nature-theme-stagger-2 relative z-10`}
        style={{
          background: `
            var(--nature-texture-overlay),
            var(--nature-gradient-chat-area)
          `,
          backgroundSize: 'cover, cover',
          backdropFilter: 'blur(4px) saturate(120%)'
        }}
      >
        {/* Messages Area */}
        <div
          className="flex-1 overflow-y-auto p-8 min-h-0"
          role="log"
          aria-live="polite"
          aria-label="Chat conversation"
        >
          <div className="max-w-5xl mx-auto space-y-8">
            {messages.map((message: Message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={settings.showTimestamps ? message.timestamp : undefined}
                isThinking={false}
                character={message.isUser ? undefined : getValidCharacter(message.characterId)}
              />
            ))}
            {isTyping && <TypingIndicator character={currentCharacter} />}
            <div ref={messagesEndRef} />
          </div>

          {/* Screen reader announcements */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {isTyping && `${currentCharacter.name} is typing a response...`}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 p-8" role="form" aria-label="Message input">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-4 items-center">
              <label htmlFor="chat-input" className="sr-only">
                Type your message to {currentCharacter.name}
              </label>
              <input
                id="chat-input"
                type="text"
                placeholder={`Share your thoughts with ${currentCharacter.name}...`}
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                aria-describedby="input-help"
                className={`font-content flex-1 px-6 py-4 rounded-xl border-none outline-none font-medium nature-theme-transition nature-theme-stagger-3 ${themeClasses.inputBg} ${themeClasses.fontInput} disabled:opacity-50 disabled:cursor-not-allowed glass-panel texture-organic`}
                style={{
                  background: `${themeClasses.natureStyle.inputBackground}`,
                  color: `${themeClasses.natureStyle.textColor}`,
                  borderColor: `${themeClasses.natureStyle.borderColor}`,
                  boxShadow: 'var(--nature-shadow)',
                  backdropFilter: 'blur(12px) saturate(150%)'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                type="submit"
                aria-label={`Send message to ${currentCharacter.name}`}
                className={`w-14 h-14 rounded-xl flex items-center justify-center nature-theme-transition nature-theme-stagger-4 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 glass-panel-strong glow-ambient animate-breathe ${themeClasses.buttonBg}`}
                style={{
                  background: `var(--nature-shimmer), ${themeClasses.natureStyle.buttonBackground}`,
                  borderColor: `${themeClasses.natureStyle.borderColor}`,
                  boxShadow: 'var(--nature-glow-intensity)',
                  backdropFilter: 'blur(16px) saturate(180%)'
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.background = `var(--nature-shimmer), ${themeClasses.natureStyle.buttonHoverBackground}`;
                    e.currentTarget.style.boxShadow = 'var(--nature-glow-intensity), 0 0 40px var(--nature-glow)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.background = `var(--nature-shimmer), ${themeClasses.natureStyle.buttonBackground}`;
                    e.currentTarget.style.boxShadow = 'var(--nature-glow-intensity)';
                  }
                }}
              >
                <SendIcon />
              </button>
            </div>
            <div id="input-help" className="sr-only">
              Press Enter to send your message, or use the Send button
            </div>
          </div>
        </div>
      </div>

      {/* Character Switch Warning Dialog */}
      <CharacterSwitchDialog
        isOpen={showSwitchDialog}
        onClose={cancelCharacterSwitch}
        onConfirm={confirmCharacterSwitch}
        currentCharacter={currentCharacter}
        targetCharacter={pendingCharacterType ? getCharacter(pendingCharacterType) : undefined}
        sidebarCollapsed={sidebarCollapsed}
      />
    </div>
  );
}

// Main App component with ErrorBoundary and ThemeProvider wrappers
export default function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}