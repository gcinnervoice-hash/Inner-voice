import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 'medium', className = '', showText = true }: LogoProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/assets/avatars/sheep.svg"
        alt="Daisy - Inner Voice Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <span className={`font-semibold text-gray-700 ${textSizeClasses[size]}`}>
          Inner Voice
        </span>
      )}
    </div>
  );
}