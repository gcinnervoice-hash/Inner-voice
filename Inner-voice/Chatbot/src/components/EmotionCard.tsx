/**
 * Emotion Card Component
 *
 * Beautiful letter-style display of emotion analysis.
 * Warm, friendly aesthetic like receiving a letter from a caring friend.
 */

import React from 'react';
import { EmotionCard as EmotionCardType, formatCardTimestamp, getRelativeTime, getTagDisplayName } from '../types/Emotion';
import { getEmotionTheme, getEmotionCardStyles } from '../themes/emotion-themes';
import { getCharacterById } from '../data/characters';
import { SheepAvatar, RabbitAvatar, FoxAvatar } from './avatars';

interface EmotionCardProps {
  card: EmotionCardType;
  onClick?: () => void;
  compact?: boolean;           // Compact view for grid
  showFullTimestamp?: boolean; // Show full timestamp vs relative
}

/**
 * Get the appropriate avatar component for a character type
 */
const getCharacterAvatar = (characterType: string, size: 'small' | 'medium' | 'large' = 'medium') => {
  switch (characterType) {
    case 'sheep':
      return <SheepAvatar size={size} isThinking={false} />;
    case 'rabbit':
      return <RabbitAvatar size={size} isThinking={false} />;
    case 'fox':
      return <FoxAvatar size={size} isThinking={false} />;
    default:
      return <SheepAvatar size={size} isThinking={false} />;
  }
};

export const EmotionCard: React.FC<EmotionCardProps> = ({
  card,
  onClick,
  compact = false,
  showFullTimestamp = false
}) => {
  const theme = getEmotionTheme(card.primaryEmotion);
  const styles = getEmotionCardStyles(card.primaryEmotion);
  const character = getCharacterById(card.characterUsed);

  const isClickable = !!onClick;

  // Postcard color palette - use AI-generated color
  const primaryColor = card.emotionColor;
  const backgroundColor = '#FFFEF9'; // Vintage cream/ivory

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden transition-all duration-300
        ${isClickable ? 'cursor-pointer hover:shadow-2xl hover:-translate-y-1' : ''}
        ${compact ? 'p-4' : 'p-8'}
      `}
      style={{
        backgroundColor: backgroundColor,
        border: `3px solid ${primaryColor}`,
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 0 80px rgba(0, 0, 0, 0.02)',
      }}
      role={isClickable ? 'button' : 'article'}
      aria-label={`Emotion card: ${theme.displayName}`}
    >
      {/* Vintage postcard texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)
          `
        }}
      />

      {/* Decorative corner stamps */}
      <div className="absolute top-2 left-2 w-12 h-12 opacity-10" style={{ borderLeft: `24px solid ${primaryColor}`, borderTop: `24px solid ${primaryColor}` }} />
      <div className="absolute bottom-2 right-2 w-12 h-12 opacity-10" style={{ borderRight: `24px solid ${primaryColor}`, borderBottom: `24px solid ${primaryColor}` }} />

      {/* Top section: Title and emotion */}
      <div className="flex items-start justify-between mb-6">
        {/* Left: Title and emotion */}
        <div className="flex-1">
          {!compact && (
            <h2 className="text-xl font-semibold mb-3 font-character" style={{ color: primaryColor }}>
              {card.conversationSummary}
            </h2>
          )}
          <div className="flex items-center gap-2">
            <span className="text-2xl">{theme.emoji}</span>
            <div>
              <div className="text-sm font-medium text-gray-700">{theme.displayName}</div>
              <div className="text-xs text-gray-500 italic">{card.emotionalTone}</div>
            </div>
          </div>
        </div>

        {/* Right: Simple avatar */}
        <div className="ml-4 flex flex-col items-center gap-1">
          <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: `${primaryColor}10` }}>
            <div className="scale-90">
              {getCharacterAvatar(card.characterUsed, 'medium')}
            </div>
          </div>
          <div className="text-xs font-medium text-gray-600">
            {character?.name}
          </div>
        </div>
      </div>

      {/* Postcard divider line */}
      <div className="w-full h-[2px] mb-6" style={{
        background: `repeating-linear-gradient(90deg, ${primaryColor} 0px, ${primaryColor} 8px, transparent 8px, transparent 12px)`,
        opacity: 0.3
      }} />

      {/* Main message area */}
      <div className={`${compact ? 'mb-3' : 'mb-6'}`}>
        <div
          className={`font-content leading-relaxed ${compact ? 'text-sm' : 'text-base'} text-gray-800`}
          style={{
            fontStyle: 'italic',
            textAlign: 'justify'
          }}
        >
          {card.supportiveNote}
        </div>
      </div>

      {/* Bottom: Postmark/Date stamp */}
      <div className="flex items-center justify-end">
        <div
          className="px-4 py-2 border-2 rounded-full inline-flex items-center gap-2"
          style={{
            borderColor: primaryColor,
            backgroundColor: `${primaryColor}05`
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: primaryColor }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span className="text-xs font-medium" style={{ color: primaryColor }}>
            {showFullTimestamp
              ? formatCardTimestamp(card.timestamp)
              : getRelativeTime(card.timestamp)
            }
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Compact Emotion Card - Grid View
 *
 * Simplified card for journal grid display
 */
export const CompactEmotionCard: React.FC<EmotionCardProps> = (props) => {
  return <EmotionCard {...props} compact={true} />;
};

/**
 * Emotion Card Skeleton - Loading State
 */
export const EmotionCardSkeleton: React.FC = () => {
  return (
    <div
      className="p-8 animate-pulse relative overflow-hidden"
      style={{
        backgroundColor: '#FFFEF9',
        border: '3px solid #E5E7EB',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 0 80px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Vintage texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)
          `
        }}
      />

      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-12 h-12 opacity-5" style={{ borderLeft: '24px solid #E5E7EB', borderTop: '24px solid #E5E7EB' }} />
      <div className="absolute bottom-2 right-2 w-12 h-12 opacity-5" style={{ borderRight: '24px solid #E5E7EB', borderBottom: '24px solid #E5E7EB' }} />

      {/* Top section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1 space-y-3">
          <div className="h-7 bg-gray-200 rounded w-2/3" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>

        {/* Simple avatar skeleton */}
        <div className="ml-4 flex flex-col items-center gap-1">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] mb-6 bg-gray-200 opacity-30" />

      {/* Content skeleton */}
      <div className="mb-6 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>

      {/* Postmark skeleton */}
      <div className="flex justify-end">
        <div className="px-4 py-2 border-2 border-gray-300 rounded-full bg-gray-100">
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
};

/**
 * Empty State - No Cards Yet
 */
export const EmotionCardEmptyState: React.FC<{
  message?: string;
  onCreateFirst?: () => void;
}> = ({ message, onCreateFirst }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="text-6xl mb-4" aria-hidden="true">🌸</div>
      <h3 className="text-2xl font-bold text-gray-700 mb-2">
        Your Emotion Journal Awaits
      </h3>
      <p className="text-gray-600 max-w-md mb-6">
        {message || "Start a conversation with your AI companion, and when you're ready, create your first emotion card to capture and reflect on your feelings."}
      </p>
      {onCreateFirst && (
        <button
          onClick={onCreateFirst}
          className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          Start Your First Conversation
        </button>
      )}
    </div>
  );
};

/**
 * Emotion Card with Reveal Animation
 *
 * Shows card with a magical reveal animation
 */
export const AnimatedEmotionCard: React.FC<EmotionCardProps & { onAnimationComplete?: () => void }> = ({
  onAnimationComplete,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Call completion callback after animation
    if (onAnimationComplete) {
      const completeTimer = setTimeout(() => {
        onAnimationComplete();
      }, 800);
      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
      `}
    >
      <EmotionCard {...props} />
    </div>
  );
};
