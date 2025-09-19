import { BaseAvatar } from './BaseAvatar';

interface RabbitAvatarProps {
  isThinking?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function RabbitAvatar({ isThinking = false, size = 'large', className }: RabbitAvatarProps) {
  return (
    <BaseAvatar
      isThinking={isThinking}
      size={size}
      className={className}
      imageSrc="/assets/avatars/rabbit.svg"
      imageAlt="Rabbit character - advice and guidance"
    />
  );
}