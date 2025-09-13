import { SheepAvatar } from "./SheepAvatar";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  isThinking?: boolean;
}

export function ChatMessage({ message, isUser, timestamp, isThinking = false }: ChatMessageProps) {
  return (
    <div className={`flex gap-6 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <SheepAvatar isThinking={isThinking} />
        </div>
      )}
      
      <div className={`flex flex-col gap-2 max-w-[65%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-xl px-6 py-4 shadow-lg ${
            isUser
              ? 'bg-white/95 text-gray-800 border border-white/50'
              : 'bg-white text-gray-800 border border-white/30'
          }`}
        >
          <p className="break-words leading-relaxed text-lg font-semibold">{message}</p>
        </div>
      </div>
    </div>
  );
}