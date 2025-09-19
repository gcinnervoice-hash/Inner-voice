import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { TypingIndicator } from "./components/TypingIndicator";
import { SendIcon } from "./components/SendIcon";
import { Sidebar } from "./components/Sidebar";
import { CharacterSwitchDialog } from "./components/CharacterSwitchDialog";
import { Message, Character, CharacterType } from "./types/Character";
import { getDefaultCharacter, getCharacter } from "./data/characters";
import { getResponseWithTiming, getCharacterIntroduction } from "./utils/responseGenerator";


export default function App() {
  // Character state management
  const [currentCharacter, setCurrentCharacter] = useState<Character>(getDefaultCharacter());

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
  const handleCharacterChange = (characterType: CharacterType) => {
    console.log('App: handleCharacterChange called with:', characterType);
    console.log('App: currentCharacter.id:', currentCharacter.id);

    // Don't show dialog if switching to the same character
    if (characterType === currentCharacter.id) {
      console.log('App: Same character selected, no change needed');
      return;
    }

    console.log('App: Showing switch dialog');
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
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-80'} border-r border-white/20 transition-all duration-300`} style={{ background: 'linear-gradient(135deg, #a8d5a8 0%, #8fbc8f 50%, #7aa87a 100%)' }}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          currentCharacter={currentCharacter}
          onCharacterChange={handleCharacterChange}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col" style={{ background: 'linear-gradient(135deg, #9fc89f 0%, #8fbc8f 50%, #7fb87f 100%)' }}>
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {messages.map((message: Message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
                isThinking={false}
                character={message.isUser ? undefined : (message.characterId ? getCharacter(message.characterId as CharacterType) : currentCharacter)}
              />
            ))}
            {isTyping && <TypingIndicator character={currentCharacter} />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Share your thoughts..."
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-6 py-4 rounded-xl bg-white/95 text-gray-800 placeholder-gray-500 border-none outline-none shadow-lg text-lg font-medium backdrop-blur-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="w-14 h-14 bg-white/95 hover:bg-white rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 backdrop-blur-sm"
              >
                <SendIcon />
              </button>
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
      />
    </div>
  );
}