import { SheepAvatar } from "./avatars/SheepAvatar";
import { RabbitAvatar } from "./avatars/RabbitAvatar";
import { FoxAvatar } from "./avatars/FoxAvatar";
import { Character } from "../types/Character";
import { getDefaultCharacter } from "../data/characters";
import { getDefaultTheme } from "../themes/nature-themes";

// Function to render the appropriate avatar based on character
function renderCharacterAvatar(character: Character, isThinking: boolean): JSX.Element {
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

export function TypingIndicator({ character }: TypingIndicatorProps): JSX.Element {
  const currentCharacter = character || getDefaultCharacter();
  const theme = getDefaultTheme();

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0">
        {renderCharacterAvatar(currentCharacter, true)}
      </div>

      <div className="flex flex-col gap-2">
        <div className="rounded-xl px-6 py-4 shadow-lg border border-gray-600/50 bg-gray-800/95 backdrop-blur-sm">
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
        <p
          className="text-sm font-medium px-2"
          style={{ color: theme.colors.textSecondary }}
        >
          {currentCharacter.name} is thinking...
        </p>
      </div>
    </div>
  );
}