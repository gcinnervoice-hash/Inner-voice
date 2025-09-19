import { SheepAvatar } from "./avatars/SheepAvatar";
import { RabbitAvatar } from "./avatars/RabbitAvatar";
import { FoxAvatar } from "./avatars/FoxAvatar";
import { Character } from "../types/Character";
import { getDefaultCharacter } from "../data/characters";

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

interface TypingIndicatorProps {
  character?: Character;
}

export function TypingIndicator({ character }: TypingIndicatorProps) {
  const currentCharacter = character || getDefaultCharacter();

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0">
        {renderCharacterAvatar(currentCharacter, true)}
      </div>

      <div className="flex flex-col gap-2">
        <div className={`rounded-xl px-6 py-4 shadow-lg border ${currentCharacter.colorTheme.messageBorder} ${currentCharacter.colorTheme.messageBackground}`}>
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
        <p className="text-white/80 text-sm font-medium px-2">{currentCharacter.name} is thinking...</p>
      </div>
    </div>
  );
}