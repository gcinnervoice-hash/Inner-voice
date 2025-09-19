import { BaseAvatar } from './BaseAvatar';

interface SheepAvatarProps {
  isThinking?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function SheepAvatar({ isThinking = false, size = 'large', className }: SheepAvatarProps) {
  return (
    <BaseAvatar
      isThinking={isThinking}
      size={size}
      className={className}
      imageSrc="/assets/avatars/sheep.svg"
      imageAlt="Sheep character - comfort and emotional support"
    />
  );
}