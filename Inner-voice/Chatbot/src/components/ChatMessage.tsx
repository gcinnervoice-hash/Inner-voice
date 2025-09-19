import { SheepAvatar } from "./avatars/SheepAvatar";
import { RabbitAvatar } from "./avatars/RabbitAvatar";
import { FoxAvatar } from "./avatars/FoxAvatar";
import { Character } from "../types/Character";
import { getDefaultCharacter } from "../data/characters";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  isThinking?: boolean;
  character?: Character;
}

// Function to render the appropriate avatar based on character
function renderCharacterAvatar(character: Character, isThinking: boolean) {
  switch (character.id) {
    case 'sheep':
      return <SheepAvatar isThinking={isThinking} />;
    case 'rabbit':
      return <RabbitAvatar isThinking={isThinking} />;
    case 'fox':
      return <FoxAvatar isThinking={isThinking} />;
    default:
      return <SheepAvatar isThinking={isThinking} />;
  }
}

export function ChatMessage({ message, isUser, timestamp, isThinking = false, character }: ChatMessageProps) {
  const currentCharacter = character || getDefaultCharacter();

  return (
    <div className={`flex gap-6 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          {renderCharacterAvatar(currentCharacter, isThinking)}
        </div>
      )}

      <div className={`flex flex-col gap-2 max-w-[65%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-xl px-6 py-4 shadow-lg ${
            isUser
              ? 'bg-white/95 text-gray-800 border border-white/50'
              : `${currentCharacter.colorTheme.messageBackground} text-gray-800 border ${currentCharacter.colorTheme.messageBorder}`
          }`}
        >
          <p className="break-words leading-relaxed text-lg font-semibold">{message}</p>
        </div>
      </div>
    </div>
  );
}