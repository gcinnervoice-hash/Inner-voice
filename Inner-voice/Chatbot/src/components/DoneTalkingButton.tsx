/**
 * Done Talking Button Component
 *
 * Floating button that appears after 3+ user messages.
 * Triggers emotion analysis and card generation.
 * Includes confirmation dialog with privacy messaging.
 */

import React, { useState } from 'react';
import { Sparkles, Lock, Trash2 } from 'lucide-react';
import * as Dialog from './ui/Dialog';

interface DoneTalkingButtonProps {
  onAnalyze: () => void | Promise<void>;
  isAnalyzing?: boolean;
  disabled?: boolean;
  messageCount?: number;        // Number of messages in conversation
}

export const DoneTalkingButton: React.FC<DoneTalkingButtonProps> = ({
  onAnalyze,
  isAnalyzing = false,
  disabled = false,
  messageCount = 0
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show button with animation after mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (disabled || isAnalyzing) return;
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    setShowConfirmDialog(false);
    await onAnalyze();
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className={`
          fixed bottom-8 right-8 z-20
          transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <button
          onClick={handleClick}
          disabled={disabled || isAnalyzing}
          className={`
            group relative
            px-6 py-4 rounded-2xl font-bold text-white
            shadow-2xl
            transition-all duration-300
            ${disabled || isAnalyzing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 hover:shadow-purple-500/50'
            }
          `}
          aria-label={isAnalyzing ? 'Analyzing conversation...' : 'Done talking - create emotion card'}
        >
          <div className="flex items-center gap-3">
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Done Talking</span>
              </>
            )}
          </div>

          {/* Shine effect on hover */}
          {!disabled && !isAnalyzing && (
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          )}
        </button>

        {/* Tooltip */}
        {!isAnalyzing && !disabled && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Create an emotion card from this conversation
            <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900" />
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog.Root open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Create Emotion Card?</Dialog.Title>

            <div className="space-y-4 mt-4">
              {/* Info Section */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-purple-900 mb-1">
                      What happens next:
                    </h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Your conversation will be analyzed by AI</li>
                      <li>• A beautiful emotion card will be created</li>
                      <li>• The card will be saved to your journal</li>
                      <li>• You'll get {messageCount} messages worth of insights</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Privacy Warning */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Trash2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Privacy Notice:
                    </h4>
                    <p className="text-sm text-amber-800">
                      Your <strong>conversation will be permanently deleted</strong> immediately after analysis.
                      Only the emotion insights (not the actual messages) will be saved to your journal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Count */}
              <div className="text-center text-gray-600 text-sm">
                Analyzing <span className="font-bold text-purple-600">{messageCount}</span> messages
                from this conversation
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                Yes, Create Card
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

/**
 * Minimal "Done Talking" Badge
 *
 * Simpler version without dialog, for inline use
 */
export const DoneTalkingBadge: React.FC<{
  onClick: () => void;
  isAnalyzing?: boolean;
}> = ({ onClick, isAnalyzing }) => {
  return (
    <button
      onClick={onClick}
      disabled={isAnalyzing}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        text-sm font-semibold transition-all duration-200
        ${isAnalyzing
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 hover:scale-105'
        }
      `}
    >
      {isAnalyzing ? (
        <>
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span>Analyzing...</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span>Done Talking</span>
        </>
      )}
    </button>
  );
};

/**
 * Loading State Component
 *
 * Displayed while emotion analysis is in progress
 */
export const EmotionAnalysisLoading: React.FC<{
  message?: string;
}> = ({ message }) => {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl p-10 max-w-lg mx-4 shadow-2xl border-2 border-purple-200">
        <div className="flex flex-col items-center text-center">
          {/* Animated Writing Effect */}
          <div className="relative mb-8">
            {/* Main Icon */}
            <div className="relative">
              <Sparkles className="w-20 h-20 text-purple-500 animate-bounce" />
              {/* Orbiting Sparkles */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-pink-400" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
                <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-purple-400" />
              </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-purple-400 opacity-20 blur-2xl rounded-full animate-pulse" />
          </div>

          {/* Loading Text */}
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Writing Your Card{dots}
          </h3>
          <p className="text-gray-700 mb-2 text-lg font-medium">
            Analyzing your emotions and creating
          </p>
          <p className="text-gray-700 mb-6 text-lg font-medium">
            a beautiful summary just for you
          </p>

          {/* Animated Progress Steps */}
          <div className="space-y-3 w-full mb-6">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
              <span className="text-gray-600">Reading your conversation...</span>
            </div>
            <div className="flex items-center gap-3 text-sm opacity-70">
              <div className="w-5 h-5 rounded-full border-2 border-purple-300" />
              <span className="text-gray-500">Identifying emotions...</span>
            </div>
            <div className="flex items-center gap-3 text-sm opacity-50">
              <div className="w-5 h-5 rounded-full border-2 border-purple-200" />
              <span className="text-gray-400">Creating your card...</span>
            </div>
          </div>

          {/* Privacy Reminder */}
          <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
            <Lock className="w-4 h-4" />
            <span className="font-medium">Private & Secure - Conversation will be deleted</span>
          </div>
        </div>
      </div>
    </div>
  );
};
