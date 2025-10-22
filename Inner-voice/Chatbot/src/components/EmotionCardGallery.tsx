/**
 * Emotion Card Gallery - TEMPORARY TESTING COMPONENT
 *
 * This component displays sample emotion cards for all three characters
 * to allow testing of the letter-style design. This is NOT for production
 * and should be removed before final deployment.
 *
 * @temporary - Delete this file when testing is complete
 */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { EmotionCard } from './EmotionCard';
import { EmotionCard as EmotionCardType } from '../types/Emotion';
import { PrimaryEmotion } from '../themes/emotion-themes';

/**
 * Sample Emotion Cards for Testing
 */
const SAMPLE_CARDS: EmotionCardType[] = [
  // Daisy (Sheep) - Anxiety Card
  {
    id: 'sample-1',
    userId: 'test-user',
    timestamp: new Date(),
    primaryEmotion: 'anxiety' as PrimaryEmotion,
    emotionIntensity: 7,
    emotionalTone: 'worried and uncertain',
    conversationSummary: 'Worried about upcoming work deadlines and responsibilities',
    emotionColor: '#A855F7',
    trigger: 'Feeling overwhelmed by upcoming responsibilities and deadlines',
    coreThought: 'I have so much to do and I\'m not sure if I can handle everything. What if I let people down?',
    supportiveNote: 'Dear friend, I can see you\'re carrying a lot right now, and it\'s completely okay to feel overwhelmed. You\'re doing your absolute best, and that truly matters. Remember, it\'s okay to take things one step at a time. You don\'t have to do everything at once. I\'m here with you. With warmth and care, Daisy 🐑',
    tags: ['work', 'self', 'future'],
    characterUsed: 'sheep',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Luna (Rabbit) - Stress Card
  {
    id: 'sample-2',
    userId: 'test-user',
    timestamp: new Date(Date.now() - 86400000), // Yesterday
    primaryEmotion: 'stress' as PrimaryEmotion,
    emotionIntensity: 8,
    emotionalTone: 'pressured and tense',
    conversationSummary: 'Juggling multiple projects and personal concerns',
    emotionColor: '#DC2626',
    trigger: 'Juggling multiple projects while dealing with personal concerns',
    coreThought: 'Everything feels like it\'s happening at once. I need a break but I can\'t seem to find the time.',
    supportiveNote: 'Dear friend, I understand how heavy this pressure feels. When everything demands your attention at once, it\'s natural to feel stretched thin. Your feelings are completely valid. Let\'s take a gentle breath together. Remember, even small moments of rest count. You deserve kindness, especially from yourself. I\'m here, walking alongside you. With understanding, Luna 🐰',
    tags: ['work', 'health', 'self'],
    characterUsed: 'rabbit',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000)
  },

  // Zara (Fox) - Excitement Card
  {
    id: 'sample-3',
    userId: 'test-user',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    primaryEmotion: 'excitement' as PrimaryEmotion,
    emotionIntensity: 9,
    emotionalTone: 'energized and hopeful',
    conversationSummary: 'Celebrating new creative project that sparks passion',
    emotionColor: '#F97316',
    trigger: 'Starting a new creative project that sparks genuine passion',
    coreThought: 'I finally found something that makes me feel alive and inspired. I can\'t wait to see where this takes me!',
    supportiveNote: 'Hey there, amazing friend! I can feel your energy radiating through every word! This is YOUR moment to shine. Your passion is contagious, and your dedication is inspiring. Keep that fire burning bright - the world needs your unique spark. Go chase that dream with everything you\'ve got! I\'m cheering you on! With excitement, Zara 🦊',
    tags: ['creative', 'self', 'future'],
    characterUsed: 'fox',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000)
  },

  // Daisy (Sheep) - Gratitude Card
  {
    id: 'sample-4',
    userId: 'test-user',
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    primaryEmotion: 'gratitude' as PrimaryEmotion,
    emotionIntensity: 8,
    emotionalTone: 'thankful and warm',
    conversationSummary: 'Reflecting on support and love from friends and family',
    emotionColor: '#34D399',
    trigger: 'Reflecting on the support and love from friends and family',
    coreThought: 'I sometimes forget to appreciate the people who are always there for me. They make everything better.',
    supportiveNote: 'Dear sweet friend, recognizing the love around you is such a beautiful gift. The fact that you take time to appreciate those who care for you shows the warmth of your heart. You deserve all the love and support you receive, and so much more. Keep nurturing these precious connections. They are treasures. With gentle appreciation, Daisy 🐑',
    tags: ['relationships', 'family', 'self'],
    characterUsed: 'sheep',
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 259200000)
  },

  // Luna (Rabbit) - Sadness Card
  {
    id: 'sample-5',
    userId: 'test-user',
    timestamp: new Date(Date.now() - 345600000), // 4 days ago
    primaryEmotion: 'sadness' as PrimaryEmotion,
    emotionIntensity: 6,
    emotionalTone: 'melancholic and tender',
    conversationSummary: 'Missing someone who is far away',
    emotionColor: '#3B82F6',
    trigger: 'Missing someone who is far away or no longer in regular contact',
    coreThought: 'Some days the distance feels heavier than others. I wish things could be different.',
    supportiveNote: 'Dear tender soul, missing someone you care about is one of the most natural feelings in the world. Your sadness shows how deeply you can love, and that\'s beautiful. It\'s okay to feel this ache. Let yourself grieve the distance while also holding onto the precious memories. The love you shared doesn\'t diminish with miles. I\'m sitting with you in this moment. With gentle compassion, Luna 🐰',
    tags: ['relationships', 'family', 'self'],
    characterUsed: 'rabbit',
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(Date.now() - 345600000)
  },

  // Zara (Fox) - Pride Card
  {
    id: 'sample-6',
    userId: 'test-user',
    timestamp: new Date(Date.now() - 432000000), // 5 days ago
    primaryEmotion: 'pride' as PrimaryEmotion,
    emotionIntensity: 9,
    emotionalTone: 'accomplished and confident',
    conversationSummary: 'Successfully completing challenging task and milestone',
    emotionColor: '#9333EA',
    trigger: 'Successfully completing a challenging task or reaching an important milestone',
    coreThought: 'I actually did it! I pushed through the doubts and proved to myself that I\'m capable.',
    supportiveNote: 'YES! Look at you, superstar! You faced the challenge head-on and CONQUERED it! This moment right here? This is proof of your strength, determination, and absolute brilliance. Never forget how capable you are. You just showed yourself and the world what you\'re made of. Keep collecting these victories - you\'re unstoppable! So incredibly proud of you! With admiration, Zara 🦊',
    tags: ['work', 'self', 'academic'],
    characterUsed: 'fox',
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(Date.now() - 432000000)
  }
];

interface EmotionCardGalleryProps {
  onClose: () => void;
}

/**
 * Emotion Card Gallery Component
 *
 * Displays sample emotion cards in a modal overlay for testing purposes.
 */
export const EmotionCardGallery: React.FC<EmotionCardGalleryProps> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? SAMPLE_CARDS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SAMPLE_CARDS.length - 1 ? 0 : prev + 1));
  };

  const currentCard = SAMPLE_CARDS[currentIndex];

  // Render as a portal to escape sidebar constraints
  const galleryContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-t-2xl p-6 shadow-lg border-b-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                Emotion Card Gallery
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Testing preview - Sample cards from all characters
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Close gallery"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Card Display */}
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
          <EmotionCard
            card={currentCard}
            compact={false}
            showFullTimestamp={true}
          />
        </div>

        {/* Navigation Controls */}
        <div className="bg-white rounded-b-2xl p-6 shadow-lg border-t-2 border-purple-200">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-600">
                Card {currentIndex + 1} of {SAMPLE_CARDS.length}
              </div>
              <div className="flex gap-2 mt-2">
                {SAMPLE_CARDS.map((card, idx) => (
                  <button
                    key={card.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      idx === currentIndex
                        ? 'bg-purple-500 w-6'
                        : 'bg-gray-300 hover:bg-purple-300'
                    }`}
                    title={`View card ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold transition-colors"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Character Info */}
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {currentCard.characterUsed === 'sheep' && '🐑'}
                {currentCard.characterUsed === 'rabbit' && '🐰'}
                {currentCard.characterUsed === 'fox' && '🦊'}
              </span>
              <div className="flex-1">
                <div className="font-bold text-gray-800">
                  {currentCard.characterUsed === 'sheep' && 'Daisy - The Nurturer'}
                  {currentCard.characterUsed === 'rabbit' && 'Luna - The Thoughtful Worrier'}
                  {currentCard.characterUsed === 'fox' && 'Zara - The Clever Motivator'}
                </div>
                <div className="text-sm text-gray-600">
                  Emotion: {currentCard.primaryEmotion} • Intensity: {currentCard.emotionIntensity}/10
                </div>
              </div>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="text-xs text-yellow-800 text-center">
              ⚠️ <strong>TEMPORARY TESTING COMPONENT</strong> - This gallery is for development/testing only and should be removed before production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Use React Portal to render at document root (escapes sidebar constraints)
  return createPortal(galleryContent, document.body);
};

export default EmotionCardGallery;
