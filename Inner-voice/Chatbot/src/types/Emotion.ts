/**
 * Emotion Card Types - Frontend
 *
 * Matches backend types for emotion cards and analysis
 */

import { CharacterType } from './Character';
import { PrimaryEmotion } from '../themes/emotion-themes';

// Emotion tag categories
export type EmotionTag =
  | 'work'
  | 'relationships'
  | 'health'
  | 'family'
  | 'future'
  | 'self'
  | 'money'
  | 'social'
  | 'creative'
  | 'academic';

/**
 * Emotion Card - represents a single emotion analysis
 */
export interface EmotionCard {
  id: string;
  userId: string;
  timestamp: Date | string;

  // Core emotion data
  primaryEmotion: PrimaryEmotion;
  emotionIntensity: number;           // 1-10 scale
  emotionalTone: string;              // 2-3 words
  conversationSummary: string;        // AI-generated title summarizing the conversation (max 60 chars)
  emotionColor: string;               // AI-selected hex color based on emotional nuance

  // Context and insights
  trigger: string;                    // What caused this feeling
  coreThought: string;                // Main concern (max 40 words)
  supportiveNote: string;             // Encouraging message (max 30 words)

  // Metadata
  tags: EmotionTag[];
  characterUsed: CharacterType;

  // Timestamps
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

/**
 * Emotion Card Statistics
 */
export interface EmotionCardStats {
  totalCards: number;
  dateRange: {
    earliest: Date | string;
    latest: Date | string;
  };
  emotionFrequency: Record<PrimaryEmotion, number>;
  categoryBreakdown: {
    positive: number;
    negative: number;
    mixed: number;
  };
  averageIntensity: number;
  mostCommonTags: Array<{ tag: EmotionTag; count: number }>;
  characterUsage: Record<CharacterType, number>;
  trendsOverTime?: Array<{
    date: Date | string;
    emotion: PrimaryEmotion;
    intensity: number;
  }>;
}

/**
 * Helper function to format timestamp
 */
export function formatCardTimestamp(timestamp: Date | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Helper function to format relative time
 */
export function getRelativeTime(timestamp: Date | string): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

/**
 * Helper function to get tag display name
 */
export function getTagDisplayName(tag: EmotionTag): string {
  const tagNames: Record<EmotionTag, string> = {
    work: 'Work',
    relationships: 'Relationships',
    health: 'Health',
    family: 'Family',
    future: 'Future',
    self: 'Self',
    money: 'Money',
    social: 'Social',
    creative: 'Creative',
    academic: 'Academic'
  };
  return tagNames[tag];
}
