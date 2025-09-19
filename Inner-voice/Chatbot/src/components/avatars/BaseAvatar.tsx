import React from 'react';

export interface BaseAvatarProps {
  isThinking?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

interface AvatarSize {
  container: string;
  svg: string;
}

const AVATAR_SIZES: Record<NonNullable<BaseAvatarProps['size']>, AvatarSize> = {
  small: {
    container: 'w-12 h-12',
    svg: 'w-full h-full'
  },
  medium: {
    container: 'w-16 h-16',
    svg: 'w-full h-full'
  },
  large: {
    container: 'w-20 h-20',
    svg: 'w-full h-full'
  }
};

export function BaseAvatar({
  isThinking = false,
  size = 'large',
  className = '',
  children,
  imageSrc,
  imageAlt = 'Character avatar'
}: BaseAvatarProps) {
  const sizeClasses = AVATAR_SIZES[size];

  return (
    <div
      className={`
        ${sizeClasses.container}
        relative
        ${isThinking ? 'animate-bounce' : ''}
        ${className}
      `}
      role="img"
      aria-label={imageAlt}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`
            ${sizeClasses.svg}
            transition-all duration-300
            ${isThinking ? 'animate-pulse' : ''}
            object-contain
          `}
        />
      ) : (
        <svg
          viewBox="0 0 100 100"
          className={`
            ${sizeClasses.svg}
            transition-all duration-300
            ${isThinking ? 'animate-pulse' : ''}
          `}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {children}
        </svg>
      )}

      {/* Thinking bubbles overlay - always rendered on top */}
      {isThinking && (
        <div className="absolute -top-2 -right-2 pointer-events-none">
          <svg
            viewBox="0 0 40 30"
            className="w-8 h-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ThinkingBubbles isThinking={true} />
          </svg>
        </div>
      )}
    </div>
  );
}

// Reusable animation components for thinking bubbles
export function ThinkingBubbles({ isThinking }: { isThinking: boolean }) {
  if (!isThinking) return null;

  return (
    <g className="thinking-bubbles">
      <circle
        cx="75"
        cy="25"
        r="3"
        fill="#ffffffff"
        stroke="#43434D"
        strokeWidth="0.5"
        className="animate-ping"
        opacity="0.9"
      />
      <circle
        cx="85"
        cy="15"
        r="2"
        fill="#fff"
        stroke="#43434D"
        strokeWidth="0.5"
        className="animate-ping"
        style={{ animationDelay: '0.3s' }}
        opacity="0.8"
      />
      <circle
        cx="92"
        cy="8"
        r="1.5"
        fill="#fff"
        stroke="#43434D"
        strokeWidth="0.5"
        className="animate-ping"
        style={{ animationDelay: '0.6s' }}
        opacity="0.7"
      />
    </g>
  );
}

// Reusable eye component with thinking state
interface EyeProps {
  cx: number;
  cy: number;
  isThinking: boolean;
  color?: string;
}

export function Eye({ cx, cy, isThinking, color = "#43434D" }: EyeProps) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={isThinking ? "2" : "1.5"}
        fill={color}
        className="transition-all duration-300"
      />
      {isThinking && (
        <circle
          cx={cx + 0.5}
          cy={cy - 0.5}
          r="0.5"
          fill="#fff"
          opacity="0.8"
        />
      )}
    </g>
  );
}

// Reusable simple smile component
interface SmileProps {
  isThinking: boolean;
  color?: string;
  centerX?: number;
  centerY?: number;
}

export function SimpleSmile({
  isThinking,
  color = "#43434D",
  centerX = 50,
  centerY = 58
}: SmileProps) {
  const leftX = centerX - (isThinking ? 3 : 2);
  const rightX = centerX + (isThinking ? 3 : 2);

  return (
    <path
      d={`M${leftX} ${centerY}c${isThinking ? '1.5 1.5 4.5 1.5 6 0' : '1 1 3 1 4 0'}`}
      stroke={color}
      strokeWidth="1"
      fill="none"
      className="transition-all duration-300"
    />
  );
}