import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { TypingIndicator } from "./components/TypingIndicator";
import { SendIcon } from "./components/SendIcon";
import { Sidebar } from "./components/Sidebar";

// Message type for chat messages
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}


export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "嗨！今天心情怎么样？有什么想和我分享的吗？",
      isUser: false,
      timestamp: "10:30 AM"
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

  setMessages((prev: Message[]) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "感谢你的分享！我能感受到你的情感，让我们一起聊聊这个话题吧～",
        "听起来很有趣！告诉我更多详情，我想更深入地了解你的想法。",
        "我理解你的感受，这确实是一个值得思考的话题。你希望我从哪个角度来帮助你呢？",
        "这个想法很棒！我们可以一起探索更多可能性，你觉得呢？"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
  setMessages((prev: Message[]) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 3000);
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
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="输入你的想法..."
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
    </div>
  );
}