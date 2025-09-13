import { SheepAvatar } from "./SheepAvatar";

export function TypingIndicator() {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0">
        <SheepAvatar isThinking={true} />
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="rounded-xl px-6 py-4 bg-white shadow-lg border border-white/30">
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
        <p className="text-white/80 text-sm font-medium px-2">Daisy正在思考中...</p>
      </div>
    </div>
  );
}