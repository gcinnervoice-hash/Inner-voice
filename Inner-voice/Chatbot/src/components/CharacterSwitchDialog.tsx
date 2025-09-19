import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Character } from '../types/Character';

interface CharacterSwitchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentCharacter?: Character;
  targetCharacter?: Character;
}

export function CharacterSwitchDialog({
  isOpen,
  onClose,
  onConfirm,
  currentCharacter,
  targetCharacter
}: CharacterSwitchDialogProps) {
  if (!isOpen || !targetCharacter) return null;

  console.log('CharacterSwitchDialog rendered:', { isOpen, targetCharacter: targetCharacter?.name });

  // Debug handlers to ensure buttons work
  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log('Close button clicked - dialog should close');
    onClose();
  };

  const handleConfirm = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log('Confirm button clicked - character should switch');
    onConfirm();
  };

  // Prevent backdrop click from interfering with button clicks
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      console.log('Backdrop clicked - closing dialog');
      handleClose();
    }
  };

  // Gentle, calming theme
  const theme = {
    accent: '#e8f5e8',
    buttonBg: 'bg-gradient-to-r from-green-400/80 to-emerald-500/80 hover:from-green-500/90 hover:to-emerald-600/90',
    cancelBg: 'bg-white/40 hover:bg-white/60 border border-white/50 hover:border-white/70',
    borderColor: 'border-white/30',
    textAccent: 'text-green-600',
    warningColor: 'text-amber-700',
    shadowColor: 'shadow-green-200/50'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in-0 duration-200" onClick={handleBackdropClick}>
      {/* Gentle backdrop with soft blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Centered Gentle Dialog */}
      <div
        className="relative transform transition-all duration-500 ease-out animate-in fade-in-0 scale-in-95 slide-in-from-bottom-4"
        style={{
          background: `linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 50%, rgba(241, 245, 249, 0.95) 100%)`,
          backdropFilter: 'blur(20px)',
        }}
        onClick={(e) => {
          console.log('Dialog content area clicked');
          e.stopPropagation();
        }}
      >
        <div
          className={`rounded-2xl shadow-2xl ${theme.shadowColor} border ${theme.borderColor} p-8 w-96 md:w-[420px] backdrop-blur-md`}
        >
          {/* Gentle Header with Character Transition */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex flex-col items-center gap-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/50 to-white/30 flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                  <span className="text-3xl transform transition-transform hover:scale-110">
                    {currentCharacter?.emoji || '🐑'}
                  </span>
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  {currentCharacter?.name || 'Daisy'}
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <ArrowRight className="w-6 h-6 text-gray-400 animate-pulse" />
                <span className="text-xs text-gray-500 font-medium">switching to</span>
              </div>

              <div className="flex flex-col items-center gap-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100/80 to-green-100/80 flex items-center justify-center shadow-lg backdrop-blur-sm border border-green-200/50">
                  <span className="text-3xl transform transition-transform hover:scale-110">
                    {targetCharacter.emoji}
                  </span>
                </div>
                <span className="text-gray-700 text-sm font-semibold">
                  {targetCharacter.name}
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('X close button clicked');
                handleClose();
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Character Context Information */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-emerald-50/60 to-green-50/60 rounded-xl p-5 border border-green-100/50 backdrop-blur-sm">
              <h4 className="text-gray-700 font-semibold text-base mb-3 text-center">
                Meet {targetCharacter.name}
                <span className="text-2xl ml-2">{targetCharacter.emoji}</span>
              </h4>
              <div className="space-y-2">
                <p className="text-gray-600 text-sm text-center">
                  <span className="font-medium text-emerald-700">Role:</span> {targetCharacter.personality.role}
                </p>
                <p className="text-gray-600 text-sm text-center">
                  <span className="font-medium text-emerald-700">Personality:</span> {targetCharacter.personality.traits.slice(0, 3).join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Gentle Warning Message */}
          <div className="mb-6">
            <div className="bg-amber-50/70 border border-amber-200/50 rounded-xl p-4 text-center backdrop-blur-sm">
              <p className="text-amber-700 text-sm flex items-center justify-center gap-2">
                <span className="text-lg">💭</span>
                <span>Your current conversation will start fresh with {targetCharacter.name}</span>
              </p>
            </div>
          </div>

          {/* Gentle Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Keep Chat button clicked');
                handleClose();
              }}
              className={`flex-1 px-6 py-4 text-sm text-gray-600 hover:text-gray-700 font-medium transition-all duration-300 rounded-xl ${theme.cancelBg} hover:scale-[1.02] hover:shadow-lg cursor-pointer backdrop-blur-sm`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-base">💬</span>
                <span>Keep Current Chat</span>
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Accept Switch button clicked');
                handleConfirm();
              }}
              className={`flex-1 px-6 py-4 text-sm text-white font-semibold rounded-xl transition-all duration-300 ${theme.buttonBg} ${theme.shadowColor} shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer backdrop-blur-sm`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg">{targetCharacter.emoji}</span>
                <span>Start Fresh with {targetCharacter.name}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}