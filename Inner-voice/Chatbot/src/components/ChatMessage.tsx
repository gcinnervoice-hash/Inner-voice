import React, { useMemo, memo } from 'react';
import { SheepAvatar } from "./avatars/SheepAvatar";
import { RabbitAvatar } from "./avatars/RabbitAvatar";
import { FoxAvatar } from "./avatars/FoxAvatar";
import { Character } from "../types/Character";
import { getDefaultCharacter } from "../data/characters";
import { useThemeClasses, useTheme } from "../contexts/ThemeContext";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string; // Made optional since we now control with showTimestamps setting
  isThinking?: boolean;
  character?: Character;
}

// Memoized avatar factory component for optimal performance
const CharacterAvatar = memo(({ character, isThinking }: { character: Character; isThinking: boolean }) => {
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
});

CharacterAvatar.displayName = 'CharacterAvatar';

const ChatMessageComponent = ({ message, isUser, timestamp, isThinking = false, character }: ChatMessageProps): JSX.Element => {
  const currentCharacter = character || getDefaultCharacter();
  const themeClasses = useThemeClasses();
  const { settings } = useTheme();

  // Use unified font size system - messages get large text for readability
  const fontSizeClass = themeClasses.fontMessage;

  // Memoized message styling with proper character theme integration
  const messageClasses = useMemo(() => {
    if (isUser) {
      return `${themeClasses.cardBg} ${themeClasses.primaryText} border ${themeClasses.cardBorder}`;
    } else {
      // Character theme integration with fallback handling
      const isDarkTheme = settings.theme === 'forest'; // Forest is our dark theme
      const characterBg = currentCharacter?.colorTheme?.messageBackground || themeClasses.cardBg;
      const characterBorder = currentCharacter?.colorTheme?.messageBorder || themeClasses.cardBorder;

      // Apply character theming with theme adaptation and null safety
      return `${characterBg} ${themeClasses.primaryText} border ${characterBorder} backdrop-blur-sm${isDarkTheme ? ' opacity-90' : ''}`;
    }
  }, [isUser, themeClasses, currentCharacter?.colorTheme, settings.theme]);

  // Memoized layout classes
  const layoutClasses = useMemo(() => ({
    container: `flex gap-6 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`,
    messageContainer: `flex flex-col gap-2 max-w-[65%] ${isUser ? 'items-end' : 'items-start'}`,
    timestampContainer: `text-xs ${themeClasses.mutedText} ${isUser ? 'text-right' : 'text-left'} transition-all duration-300`
  }), [isUser, themeClasses.mutedText]);

  return (
    <div className={layoutClasses.container}>
      {!isUser && (
        <div className="flex-shrink-0">
          <CharacterAvatar character={currentCharacter} isThinking={isThinking} />
        </div>
      )}

      <div className={layoutClasses.messageContainer}>
        <div className={`rounded-xl px-6 py-4 shadow-lg transition-all duration-300 ${messageClasses}`}>
          <p className={`font-content break-words leading-relaxed font-semibold transition-all duration-300 ${fontSizeClass}`}>
            {message}
          </p>
        </div>

        {/* Timestamp display (only if enabled and provided) */}
        {timestamp && settings.showTimestamps && (
          <div className={layoutClasses.timestampContainer}>
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

// Custom comparison function for React.memo to prevent unnecessary re-renders
const arePropsEqual = (prevProps: ChatMessageProps, nextProps: ChatMessageProps): boolean => {
  return (
    prevProps.message === nextProps.message &&
    prevProps.isUser === nextProps.isUser &&
    prevProps.timestamp === nextProps.timestamp &&
    prevProps.isThinking === nextProps.isThinking &&
    prevProps.character?.id === nextProps.character?.id
  );
};

// Memoized export with custom comparison
export const ChatMessage = memo(ChatMessageComponent, arePropsEqual);