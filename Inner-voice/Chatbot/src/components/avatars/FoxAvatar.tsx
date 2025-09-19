import { BaseAvatar } from './BaseAvatar';

interface FoxAvatarProps {
  isThinking?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function FoxAvatar({ isThinking = false, size = 'large', className }: FoxAvatarProps) {
  return (
    <BaseAvatar
      isThinking={isThinking}
      size={size}
      className={className}
      imageSrc="/assets/avatars/fox.svg"
      imageAlt="Fox character - problem-solving and action"
    />
  );
}