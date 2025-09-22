import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { TypingIndicator } from "./components/TypingIndicator";
import { SendIcon } from "./components/SendIcon";
import { Sidebar } from "./components/Sidebar";
import { CharacterSwitchDialog } from "./components/CharacterSwitchDialog";
import { Message, Character, CharacterType } from "./types/Character";
import { getDefaultCharacter, getCharacter, getCharacterById } from "./data/characters";
import { getResponseWithTiming, getCharacterIntroduction } from "./utils/responseGenerator";
import { ThemeProvider, useThemeClasses, useTheme } from "./contexts/ThemeContext";
import { ErrorBoundary } from "./components/ErrorBoundary";


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

  // Character state management
  const [currentCharacter, setCurrentCharacter] = useState<Character>(getDefaultCharacter());

  // Safe character resolution helper to prevent type casting errors
  const getValidCharacter = (characterId?: string): Character => {
    if (!characterId) return currentCharacter;

    // Use getCharacterById which safely returns undefined for invalid IDs
    const foundCharacter = getCharacterById(characterId);
    return foundCharacter || currentCharacter;
  };

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Dialog state for character switching warning
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [pendingCharacterType, setPendingCharacterType] = useState<CharacterType | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Character switching function - shows warning dialog first
  const handleCharacterChange = (characterType: CharacterType): void => {
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
  };

  // Function to actually perform the character switch with conversation reset
  const confirmCharacterSwitch = () => {
    if (!pendingCharacterType) return;

    const newCharacter = getCharacter(pendingCharacterType);
    setCurrentCharacter(newCharacter);
    setIsTyping(false); // Stop typing indicator when switching

    // Reset conversation - only keep new character's introduction
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

    // Close dialog and clear pending state
    setShowSwitchDialog(false);
    setPendingCharacterType(null);
  };

  // Function to cancel character switch
  const cancelCharacterSwitch = () => {
    setShowSwitchDialog(false);
    setPendingCharacterType(null);
  };

  const handleSendMessage = async () => {
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
      // Get character-specific response with intelligent timing
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
    } catch (error) {
      console.error('Error generating response:', error);
      // Fallback response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm a bit busy right now. Please try again!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        characterId: currentCharacter.id,
        category: "supportive"
      };
      setMessages((prev: Message[]) => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handler function for sidebar
  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      className={`min-h-screen h-screen max-h-screen flex overflow-hidden nature-theme-transition nature-background-crossfade ${themeClasses.primaryBg}`}
      style={{
        background: `${themeClasses.natureStyle.background}`,
        backgroundSize: 'cover, auto',
        backgroundBlendMode: 'normal, overlay'
      }}
    >
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? 'w-20' : 'w-80'} flex-shrink-0 border-r ${themeClasses.cardBorder} nature-theme-transition nature-theme-stagger-1 ${themeClasses.sidebarBg} overflow-hidden`}
        style={{
          background: `${themeClasses.natureStyle.sidebarBackground}`,
          backdropFilter: 'blur(8px)'
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
        className={`flex-1 flex flex-col min-w-0 ${themeClasses.chatAreaBg} nature-theme-transition nature-theme-stagger-2`}
        style={{
          background: `${themeClasses.natureStyle.chatBackground}`,
          backgroundSize: 'cover, auto',
          backdropFilter: 'blur(2px)'
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
                className={`font-content flex-1 px-6 py-4 rounded-xl border-none outline-none shadow-lg font-medium backdrop-blur-sm nature-theme-transition nature-theme-stagger-3 ${themeClasses.inputBg} ${themeClasses.fontInput} disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{
                  background: `${themeClasses.natureStyle.inputBackground}`,
                  color: `${themeClasses.natureStyle.textColor}`,
                  borderColor: `${themeClasses.natureStyle.borderColor}`
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                type="submit"
                aria-label={`Send message to ${currentCharacter.name}`}
                className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg nature-theme-transition nature-theme-stagger-4 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 backdrop-blur-sm ${themeClasses.buttonBg}`}
                style={{
                  background: `${themeClasses.natureStyle.buttonBackground}`,
                  borderColor: `${themeClasses.natureStyle.borderColor}`
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.background = themeClasses.natureStyle.buttonHoverBackground;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.background = themeClasses.natureStyle.buttonBackground;
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