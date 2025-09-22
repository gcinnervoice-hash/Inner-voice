import React, { useEffect, useCallback } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Character } from '../types/Character';

interface CharacterSwitchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentCharacter?: Character;
  targetCharacter?: Character;
  sidebarCollapsed?: boolean;
}

export function CharacterSwitchDialog({
  isOpen,
  onClose,
  onConfirm,
  currentCharacter,
  targetCharacter,
  sidebarCollapsed = false
}: CharacterSwitchDialogProps): JSX.Element | null {
  // Clean event handlers without excessive stopping propagation
  const handleClose = useCallback((e?: React.MouseEvent): void => {
    e?.stopPropagation();
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback((e?: React.MouseEvent): void => {
    e?.stopPropagation();
    onConfirm();
  }, [onConfirm]);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = useCallback((e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  // Add/remove keyboard listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Simple backdrop click handler
  const handleBackdropClick = useCallback((e: React.MouseEvent): void => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  if (!isOpen || !targetCharacter) return null;

  // Calculate positioning based on sidebar state with responsive considerations
  const sidebarWidth = sidebarCollapsed ? 80 : 320; // w-20 = 80px, w-80 = 320px
  const spacing = 24; // 24px (1.5rem) spacing from sidebar
  const leftMargin = sidebarWidth + spacing;

  // Dynamic theme based on target character with enhanced styling
  const getCharacterTheme = () => {
    if (!targetCharacter) return null;

    const { colorTheme } = targetCharacter;

    // Convert hex colors to RGB for alpha transparency
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const primaryRgb = hexToRgb(colorTheme.primary);
    const accentRgb = hexToRgb(colorTheme.accent);

    if (!primaryRgb || !accentRgb) return null;

    return {
      // Enhanced gradient backgrounds with character colors
      dialogBg: `linear-gradient(145deg,
        rgba(31, 41, 55, 0.95) 0%,
        rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.15) 30%,
        rgba(55, 65, 81, 0.95) 70%,
        rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.1) 100%)`,

      // Smooth gradient borders
      borderColor: `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.4)`,

      // Character-themed button gradients
      buttonBg: `linear-gradient(135deg,
        rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.8) 0%,
        rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.9) 100%)`,

      // Enhanced shadows with character colors
      shadowColor: `0 25px 50px -12px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.25),
                   0 0 0 1px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.1)`,

      // Character context card styling
      cardBg: `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.1)`,
      cardBorder: `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.3)`,

      // Text accent colors
      textAccent: colorTheme.primary,

      // Character-specific glow effect
      glowEffect: `0 0 30px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.3)`
    };
  };

  const characterTheme = getCharacterTheme();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center animate-in fade-in-0 duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      {/* Gentle backdrop with soft blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Cute Dialog Container - Right of Sidebar */}
      <div
        className="relative transform transition-all duration-500 ease-out animate-in fade-in-0 scale-in-95 slide-in-from-left-4 max-w-md lg:max-w-lg animate-bounce"
        style={{
          marginLeft: `${leftMargin}px`,
          marginRight: `${spacing}px`,
          background: `linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)`,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)',
          borderRadius: '24px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-6 md:p-8 w-full transition-all duration-300 hover:scale-[1.01]"
          style={{
            borderRadius: '20px',
            border: `3px solid ${characterTheme?.borderColor || 'rgba(255, 182, 193, 0.6)'}`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, ${characterTheme?.cardBg || 'rgba(255, 182, 193, 0.1)'} 100%)`
          }}
        >
          {/* Cute Header with Character Transition */}
          <div className="text-center mb-6 md:mb-8">
            {/* Hidden labels for screen readers */}
            <h3 id="dialog-title" className="sr-only">
              Switch Character Confirmation
            </h3>
            <p id="dialog-description" className="sr-only">
              Switching from {currentCharacter?.name || 'Daisy'} to {targetCharacter.name} will start a new conversation
            </p>

            {/* Cute title with sparkles */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-700 flex items-center justify-center gap-2">
                <span className="text-yellow-400 animate-pulse">✨</span>
                <span>Character Switch</span>
                <span className="text-yellow-400 animate-pulse">✨</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">Choose your new companion! 🌟</p>
            </div>

            <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
              <div className="flex flex-col items-center gap-2 transition-all duration-300 group">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center shadow-lg border-4 border-white/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <span className="text-3xl animate-bounce" aria-label={`Current character: ${currentCharacter?.name || 'Daisy'}`}>
                      {currentCharacter?.emoji || '🐑'}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center text-xs animate-pulse">
                    💭
                  </div>
                </div>
                <span className="text-gray-600 text-sm font-semibold bg-white/60 px-3 py-1 rounded-full">
                  {currentCharacter?.name || 'Daisy'}
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-lg">💫</span>
                </div>
                <span className="text-xs text-gray-500 font-medium bg-white/40 px-2 py-1 rounded-full">switching to</span>
              </div>

              <div className="flex flex-col items-center gap-2 transition-all duration-300 group">
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 border-4 border-white/80 animate-pulse"
                    style={{
                      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, ${characterTheme?.cardBg || 'rgba(255, 182, 193, 0.3)'} 100%)`,
                      boxShadow: `0 8px 25px ${characterTheme?.borderColor || 'rgba(255, 182, 193, 0.4)'}`
                    }}
                  >
                    <span className="text-3xl animate-bounce" aria-label={`Target character: ${targetCharacter.name}`}>
                      {targetCharacter.emoji}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs animate-spin">
                    ⭐
                  </div>
                </div>
                <span className="text-gray-600 text-sm font-bold bg-gradient-to-r from-white/80 to-white/60 px-3 py-1 rounded-full shadow-sm">
                  {targetCharacter.name}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-pink-200 to-red-200 hover:from-pink-300 hover:to-red-300 text-red-600 hover:text-red-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-90"
              aria-label="Close dialog"
              type="button"
            >
              <span className="text-lg">✕</span>
            </button>
          </div>

          {/* Cute Character Context Information */}
          <div className="mb-5 md:mb-6">
            <div
              className="rounded-3xl p-4 md:p-5 transition-all duration-200 hover:scale-[1.02] border-2 border-white/50"
              style={{
                background: `linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, ${characterTheme?.cardBg || 'rgba(255, 182, 193, 0.2)'} 100%)`,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              }}
            >
              <h4 className="text-gray-700 font-bold text-lg mb-3 text-center flex items-center justify-center gap-2">
                <span className="animate-bounce">🌟</span>
                <span>Meet {targetCharacter.name}</span>
                <span className="text-2xl">{targetCharacter.emoji}</span>
                <span className="animate-bounce">🌟</span>
              </h4>
              <div className="space-y-3">
                <div className="bg-white/60 rounded-2xl p-3 text-center">
                  <p className="text-gray-700 text-sm">
                    <span className="font-bold text-purple-600">💼 Role:</span>
                    <span className="ml-1">{targetCharacter.personality.role}</span>
                  </p>
                </div>
                <div className="bg-white/60 rounded-2xl p-3 text-center">
                  <p className="text-gray-700 text-sm">
                    <span className="font-bold text-pink-600">✨ Personality:</span>
                    <span className="ml-1">{targetCharacter.personality.traits.slice(0, 3).join(', ')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cute Warning Message */}
          <div className="mb-5 md:mb-6">
            <div className="rounded-3xl p-4 text-center transition-all duration-200 hover:scale-[1.02] bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-200 shadow-lg">
              <p className="text-orange-600 text-sm font-medium flex items-center justify-center gap-2">
                <span className="text-lg animate-pulse">🔄</span>
                <span>Starting a fresh new chat with {targetCharacter.name}!</span>
                <span className="text-lg animate-pulse">💫</span>
              </p>
              <p className="text-xs text-orange-500 mt-1">Don't worry, your friendship continues! 🤗</p>
            </div>
          </div>

          {/* Super Cute Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-4 text-sm text-gray-600 hover:text-gray-700 font-semibold transition-all duration-300 rounded-3xl cursor-pointer hover:scale-[1.05] bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-300 shadow-lg hover:shadow-xl"
              aria-label="Keep current conversation"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg animate-pulse" aria-hidden="true">🏠</span>
                <span>Stay Here</span>
              </span>
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-6 py-4 text-sm text-white font-bold rounded-3xl transition-all duration-300 cursor-pointer hover:scale-[1.05] hover:shadow-2xl border-2 border-white/50 relative overflow-hidden"
              style={{
                background: characterTheme?.buttonBg || 'linear-gradient(135deg, rgba(255, 105, 180, 0.9) 0%, rgba(255, 20, 147, 0.9) 100%)',
                boxShadow: '0 8px 32px rgba(255, 105, 180, 0.4)'
              }}
              aria-label={`Start new conversation with ${targetCharacter.name}`}
            >
              <span className="flex items-center justify-center gap-2 relative z-10">
                <span className="text-lg animate-bounce" aria-hidden="true">{targetCharacter.emoji}</span>
                <span>Let's Go!</span>
                <span className="text-lg animate-pulse" aria-hidden="true">🚀</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}