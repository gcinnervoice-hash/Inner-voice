 import React, { useState, useRef, useEffect, useCallback, useMemo, memo, createContext, useContext } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
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
import { LandingPage } from "./components/LandingPage";
import { PrivacyPolicy } from "./components/legal/PrivacyPolicy";
import { TermsOfService } from "./components/legal/TermsOfService";
import { CookiePolicy } from "./components/legal/CookiePolicy";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { EmotionAnalysisLoading } from "./components/DoneTalkingButton";
import { AnimatedEmotionCard } from "./components/EmotionCard";
import { EmotionJournal } from "./components/EmotionJournal";
import { emotionService } from "./services/emotionService";
import { EmotionCard as EmotionCardType } from "./types/Emotion";


// Development debug utility
const DEBUG = process.env.NODE_ENV === 'development';
const debugLog = (...args: any[]): void => {
  if (DEBUG) {
    console.log('[Inner-Voice Debug]', ...args);
  }
};

// Conversation Context for persisting state across routes
// Includes all conversation data AND UI state to preserve them during navigation
export const ConversationContext = createContext<{
  // Conversation data
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  currentCharacter: Character;
  setCurrentCharacter: React.Dispatch<React.SetStateAction<Character>>;
  sessionId: string | undefined;
  setSessionId: React.Dispatch<React.SetStateAction<string | undefined>>;

  // UI state that must survive navigation
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  useRealAPI: boolean;
  setUseRealAPI: React.Dispatch<React.SetStateAction<boolean>>;

  // Loading and status states
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  isAnalyzingEmotion: boolean;
  setIsAnalyzingEmotion: React.Dispatch<React.SetStateAction<boolean>>;
  emotionError: string | null;
  setEmotionError: React.Dispatch<React.SetStateAction<string | null>>;

  // Emotion card state
  createdEmotionCard: EmotionCardType | null;
  setCreatedEmotionCard: React.Dispatch<React.SetStateAction<EmotionCardType | null>>;

  // Dialog state for character switching warning
  showSwitchDialog: boolean;
  setShowSwitchDialog: React.Dispatch<React.SetStateAction<boolean>>;
  pendingCharacterType: CharacterType | null;
  setPendingCharacterType: React.Dispatch<React.SetStateAction<CharacterType | null>>;

  // Utilities
  getValidCharacter: (characterId?: string) => Character;
} | null>(null);

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) throw new Error('useConversation must be used within AppLayout');
  return context;
};

// Conversation state wrapper - holds state for all /app/* routes
// All state including UI state is preserved across navigation
function AppLayout(): JSX.Element {
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

  // Session and conversation state
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [isTyping, setIsTyping] = useState(false);

  // UI state that now persists across navigation
  const [inputValue, setInputValue] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [useRealAPI, setUseRealAPI] = useState(true);

  // Loading and error states
  const [isAnalyzingEmotion, setIsAnalyzingEmotion] = useState(false);
  const [emotionError, setEmotionError] = useState<string | null>(null);

  // Dialog state for character switching warning
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [pendingCharacterType, setPendingCharacterType] = useState<CharacterType | null>(null);

  // Emotion card state
  const [createdEmotionCard, setCreatedEmotionCard] = useState<EmotionCardType | null>(null);

  // Provide COMPLETE conversation state to all child routes
  // This ensures all state survives navigation between /app routes
  return (
    <ConversationContext.Provider value={{
      // Conversation data
      messages, setMessages,
      currentCharacter, setCurrentCharacter,
      sessionId, setSessionId,

      // UI state (persists across navigation)
      inputValue, setInputValue,
      sidebarCollapsed, setSidebarCollapsed,
      useRealAPI, setUseRealAPI,

      // Loading and status states
      isTyping, setIsTyping,
      isAnalyzingEmotion, setIsAnalyzingEmotion,
      emotionError, setEmotionError,

      // Emotion card state
      createdEmotionCard, setCreatedEmotionCard,

      // Dialog state
      showSwitchDialog, setShowSwitchDialog,
      pendingCharacterType, setPendingCharacterType,

      // Utilities
      getValidCharacter
    }}>
      <Outlet />
    </ConversationContext.Provider>
  );
}

// Chat Interface Component (protected route)
function ChatInterface(): JSX.Element {
  const navigate = useNavigate();
  const themeClasses = useThemeClasses();
  const { settings } = useTheme();
  const { logout } = useAuth();

  // Get ALL conversation state from context (including UI state)
  // This ensures state persists when navigating to EmotionJournal
  const {
    // Conversation data
    messages, setMessages,
    currentCharacter, setCurrentCharacter,
    sessionId, setSessionId,

    // UI state from context (persists across navigation)
    inputValue, setInputValue,
    sidebarCollapsed, setSidebarCollapsed,
    useRealAPI, setUseRealAPI,

    // Loading states
    isTyping, setIsTyping,
    isAnalyzingEmotion, setIsAnalyzingEmotion,
    emotionError, setEmotionError,

    // Emotion card state
    createdEmotionCard, setCreatedEmotionCard,

    // Dialog state
    showSwitchDialog, setShowSwitchDialog,
    pendingCharacterType, setPendingCharacterType,
    getValidCharacter
  } = useConversation();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      // Refocus input after response is complete
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
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

  // Auto-scroll to bottom when new messages are added (only if user is near bottom)
  useEffect(() => {
    const scrollContainer = messagesEndRef.current?.parentElement;
    if (!scrollContainer) return;

    // Check if user is near the bottom (within 100px)
    const isNearBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight < 100;

    // Only auto-scroll if user is near the bottom or it's the first message
    if (isNearBottom || messages.length === 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, isTyping]);

  // Handle logout
  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  // Handle emotion analysis (Done Talking)
  const handleAnalyzeConversation = useCallback(async () => {
    if (!sessionId) {
      setEmotionError('No active conversation to analyze');
      return;
    }

    try {
      setIsAnalyzingEmotion(true);
      setEmotionError(null);

      debugLog('Analyzing conversation for emotion card', { sessionId, characterId: currentCharacter.id });

      // Call emotion service to analyze conversation
      const response = await emotionService.analyzeConversation(
        sessionId,
        currentCharacter.id as CharacterType
      );

      debugLog('Emotion card created successfully', { cardId: response.card.id });

      // Show the created card
      setCreatedEmotionCard(response.card);

      // Clear the conversation (start fresh)
      setMessages([]);
      setSessionId(undefined);

      // Show success message after a delay
      setTimeout(() => {
        const successMessage: Message = {
          id: `success-${Date.now()}`,
          text: `✨ Your emotion card has been created and saved to your journal! The conversation has been permanently deleted for your privacy. You can view your emotion card in the journal.`,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          characterId: currentCharacter.id,
          category: 'supportive'
        };
        setMessages([successMessage]);
      }, 3000);

    } catch (error) {
      console.error('Failed to analyze conversation:', error);
      setEmotionError(error instanceof Error ? error.message : 'Failed to create emotion card');

      // Show error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: `Sorry, I couldn't create your emotion card. Please try again later or contact support if the issue persists.`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        characterId: currentCharacter.id,
        category: 'supportive'
      };
      setMessages([errorMessage]);
    } finally {
      setIsAnalyzingEmotion(false);
    }
  }, [sessionId, currentCharacter]);

  return (
    <div
      className={`h-screen w-screen flex overflow-hidden nature-theme-transition nature-background-crossfade bg-layered ${themeClasses.primaryBg}`}
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
        backgroundBlendMode: 'soft-light, overlay, normal, normal, normal',
        position: 'fixed',
        inset: 0
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
          background: `
            var(--nature-texture-overlay),
            var(--nature-gradient-chat-area)
          `,
          backgroundSize: 'cover, cover',
          backdropFilter: 'blur(4px) saturate(120%)',
          borderColor: `${themeClasses.natureStyle.borderColor}`
        }}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          currentCharacter={currentCharacter}
          onCharacterChange={handleCharacterChange}
          onDoneTalking={handleAnalyzeConversation}
          isAnalyzing={isAnalyzingEmotion}
          canAnalyze={!!sessionId && !createdEmotionCard}
          messageCount={messages.length}
        />
      </div>

      {/* Main Chat Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 min-h-0 ${themeClasses.chatAreaBg} nature-theme-transition nature-theme-stagger-2 relative z-10`}
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
          className="flex-1 p-8 min-h-0 overflow-hidden"
          role="log"
          aria-live="polite"
          aria-label="Chat conversation"
        >
          <div className="h-full overflow-y-auto overflow-x-hidden">
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
                ref={inputRef}
                id="chat-input"
                type="text"
                placeholder={`Share your thoughts with ${currentCharacter.name}...`}
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                aria-describedby="input-help"
                className={`font-content flex-1 px-6 py-4 rounded-xl border outline-none font-medium ${themeClasses.fontInput} disabled:opacity-50 disabled:cursor-not-allowed`}
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
                className={`w-14 h-14 rounded-xl border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity ${themeClasses.buttonBg}`}
                style={{
                  background: `${themeClasses.natureStyle.buttonBackground}`,
                  borderColor: `${themeClasses.natureStyle.borderColor}`
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

      {/* Emotion Analysis Loading Screen */}
      {isAnalyzingEmotion && (
        <EmotionAnalysisLoading message="Analyzing your conversation with AI..." />
      )}

      {/* Emotion Card Success Display */}
      {createdEmotionCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="max-w-2xl w-full">
            <AnimatedEmotionCard
              card={createdEmotionCard}
              onAnimationComplete={() => {
                setTimeout(() => setCreatedEmotionCard(null), 5000);
              }}
            />
            <div className="text-center mt-6">
              <button
                onClick={() => setCreatedEmotionCard(null)}
                className="px-6 py-3 rounded-xl bg-white text-purple-700 font-semibold hover:bg-purple-50 transition-colors shadow-lg mr-4"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setCreatedEmotionCard(null);
                  navigate('/app/journal');
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                View Journal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Inner Voice...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

// Main App component with routing
export default function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <>
          <CookieConsentBanner />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            {/* Protected Routes with shared state */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ChatInterface />} />
              <Route path="journal" element={<EmotionJournal />} />
            </Route>

            {/* Redirect any unknown routes to landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      </ThemeProvider>
    </ErrorBoundary>
  );
}