/**
 * Emotion Theme System
 *
 * Visual styling for 28 emotion types with a warm, postcard-like aesthetic.
 * Each emotion has:
 * - Unique emoji representation
 * - Pastel background color
 * - Complementary accent color
 * - Category classification (positive/negative/mixed)
 */

export type PrimaryEmotion =
  // Positive Emotions
  | 'joy'
  | 'gratitude'
  | 'pride'
  | 'excitement'
  | 'contentment'
  | 'hope'
  | 'relief'
  | 'love'
  // Negative Emotions
  | 'anxiety'
  | 'sadness'
  | 'anger'
  | 'loneliness'
  | 'exhaustion'
  | 'stress'
  | 'hurt'
  | 'fear'
  | 'frustration'
  | 'disappointment'
  | 'guilt'
  | 'shame'
  // Mixed/Complex Emotions
  | 'bittersweet'
  | 'nostalgic'
  | 'conflicted'
  | 'overwhelmed';

export type EmotionCategory = 'positive' | 'negative' | 'mixed';

export interface EmotionTheme {
  emotion: PrimaryEmotion;
  emoji: string;
  color: string;         // Pastel background color
  accent: string;        // Border/accent color
  category: EmotionCategory;
  displayName: string;   // Human-readable name
  description: string;   // Short emotional description
}

/**
 * Complete Emotion Theme Definitions
 *
 * Carefully chosen pastel colors that feel warm, supportive, and inviting
 * (not clinical or harsh)
 */
export const EMOTION_THEMES: Record<PrimaryEmotion, EmotionTheme> = {
  // ========================================
  // POSITIVE EMOTIONS
  // ========================================
  joy: {
    emotion: 'joy',
    emoji: '😊',
    color: '#FEF9C3',      // Sunny yellow (research-backed: yellow = happiness/joy)
    accent: '#FBBF24',
    category: 'positive',
    displayName: 'Joy',
    description: 'Pure happiness and delight'
  },
  gratitude: {
    emotion: 'gratitude',
    emoji: '🙏',
    color: '#D1FAE5',      // Soft green (research: green = contentment, calm positive emotions)
    accent: '#34D399',
    category: 'positive',
    displayName: 'Gratitude',
    description: 'Feeling thankful and appreciative'
  },
  pride: {
    emotion: 'pride',
    emoji: '🌟',
    color: '#DDD6FE',      // Royal purple (research: pride = purple, color of royalty)
    accent: '#9333EA',
    category: 'positive',
    displayName: 'Pride',
    description: 'Sense of accomplishment'
  },
  excitement: {
    emotion: 'excitement',
    emoji: '🎉',
    color: '#FED7AA',      // Vibrant orange (research: orange = energy, enthusiasm)
    accent: '#F97316',
    category: 'positive',
    displayName: 'Excitement',
    description: 'Enthusiastic and energized'
  },
  contentment: {
    emotion: 'contentment',
    emoji: '😌',
    color: '#D1FAE5',      // Calm green (research: green = contentment, low arousal positive)
    accent: '#10B981',
    category: 'positive',
    displayName: 'Contentment',
    description: 'Peaceful satisfaction'
  },
  hope: {
    emotion: 'hope',
    emoji: '🌅',
    color: '#FEF3C7',      // Soft yellow (research: yellow = optimism, positivity)
    accent: '#F59E0B',
    category: 'positive',
    displayName: 'Hope',
    description: 'Optimistic about the future'
  },
  relief: {
    emotion: 'relief',
    emoji: '😮‍💨',
    color: '#DBEAFE',      // Soft blue (research: blue = relief 35%, white-relief 44%)
    accent: '#60A5FA',
    category: 'positive',
    displayName: 'Relief',
    description: 'Released from worry or stress'
  },
  love: {
    emotion: 'love',
    emoji: '💕',
    color: '#FBCFE8',      // Pink (research: pink-love endorsed by 63% of participants)
    accent: '#EC4899',
    category: 'positive',
    displayName: 'Love',
    description: 'Deep affection and connection'
  },

  // ========================================
  // NEGATIVE EMOTIONS
  // ========================================
  anxiety: {
    emotion: 'anxiety',
    emoji: '😰',
    color: '#E9D5FF',      // Purple (research: anxiety/fear = purple)
    accent: '#A855F7',
    category: 'negative',
    displayName: 'Anxiety',
    description: 'Worried and uneasy'
  },
  sadness: {
    emotion: 'sadness',
    emoji: '😢',
    color: '#BFDBFE',      // Blue (research: sadness = blue, most consistent finding)
    accent: '#3B82F6',
    category: 'negative',
    displayName: 'Sadness',
    description: 'Down and heavy-hearted'
  },
  anger: {
    emotion: 'anger',
    emoji: '😤',
    color: '#FECACA',      // Red (research: anger = red, most frequent assignment)
    accent: '#DC2626',
    category: 'negative',
    displayName: 'Anger',
    description: 'Frustrated and irritated'
  },
  loneliness: {
    emotion: 'loneliness',
    emoji: '😞',
    color: '#BFDBFE',      // Dark blue (research: loneliness linked to sadness/blue)
    accent: '#2563EB',
    category: 'negative',
    displayName: 'Loneliness',
    description: 'Feeling isolated'
  },
  exhaustion: {
    emotion: 'exhaustion',
    emoji: '😫',
    color: '#E5E7EB',      // Gray (research: gray = low power, tiredness, boredom)
    accent: '#6B7280',
    category: 'negative',
    displayName: 'Exhaustion',
    description: 'Physically and emotionally drained'
  },
  stress: {
    emotion: 'stress',
    emoji: '😓',
    color: '#FEE2E2',      // Red-orange (research: stress = high arousal negative)
    accent: '#EF4444',
    category: 'negative',
    displayName: 'Stress',
    description: 'Overwhelmed and pressured'
  },
  hurt: {
    emotion: 'hurt',
    emoji: '💔',
    color: '#FECACA',      // Red-pink (research: hurt = pain, negative arousal)
    accent: '#F87171',
    category: 'negative',
    displayName: 'Hurt',
    description: 'Emotionally wounded'
  },
  fear: {
    emotion: 'fear',
    emoji: '😨',
    color: '#DDD6FE',      // Purple (research: fear = purple)
    accent: '#7C3AED',
    category: 'negative',
    displayName: 'Fear',
    description: 'Scared or threatened'
  },
  frustration: {
    emotion: 'frustration',
    emoji: '😣',
    color: '#FED7AA',      // Orange-red (research: frustration similar to anger)
    accent: '#EA580C',
    category: 'negative',
    displayName: 'Frustration',
    description: 'Blocked or stuck'
  },
  disappointment: {
    emotion: 'disappointment',
    emoji: '😔',
    color: '#E0E7EB',      // Gray-blue (research: disappointment = low arousal negative)
    accent: '#64748B',
    category: 'negative',
    displayName: 'Disappointment',
    description: 'Let down or discouraged'
  },
  guilt: {
    emotion: 'guilt',
    emoji: '😞',
    color: '#E0E7EB',      // Gray (research: guilt = low power emotion)
    accent: '#6B7280',
    category: 'negative',
    displayName: 'Guilt',
    description: 'Regretful about actions'
  },
  shame: {
    emotion: 'shame',
    emoji: '😳',
    color: '#FEE2E2',      // Soft red (research: shame = self-directed negative)
    accent: '#F87171',
    category: 'negative',
    displayName: 'Shame',
    description: 'Feeling inadequate'
  },

  // ========================================
  // MIXED/COMPLEX EMOTIONS
  // ========================================
  bittersweet: {
    emotion: 'bittersweet',
    emoji: '🥲',
    color: '#E9D5FF',      // Purple-pink (mixed emotions: happy + sad)
    accent: '#C084FC',
    category: 'mixed',
    displayName: 'Bittersweet',
    description: 'Happy and sad at once'
  },
  nostalgic: {
    emotion: 'nostalgic',
    emoji: '🌙',
    color: '#DBEAFE',      // Soft blue (longing for past = sadness tint)
    accent: '#60A5FA',
    category: 'mixed',
    displayName: 'Nostalgic',
    description: 'Longing for the past'
  },
  conflicted: {
    emotion: 'conflicted',
    emoji: '😕',
    color: '#FEF3C7',      // Yellow-gray (uncertainty, confusion)
    accent: '#D97706',
    category: 'mixed',
    displayName: 'Conflicted',
    description: 'Torn between feelings'
  },
  overwhelmed: {
    emotion: 'overwhelmed',
    emoji: '😵‍💫',
    color: '#E0F2FE',      // Cyan-gray (too much processing, stress blend)
    accent: '#0891B2',
    category: 'mixed',
    displayName: 'Overwhelmed',
    description: 'Too much to process'
  }
};

/**
 * Helper function to get emotion theme by emotion type
 */
export function getEmotionTheme(emotion: PrimaryEmotion): EmotionTheme {
  return EMOTION_THEMES[emotion];
}

/**
 * Helper function to get all emotions by category
 */
export function getEmotionsByCategory(category: EmotionCategory): EmotionTheme[] {
  return Object.values(EMOTION_THEMES).filter(theme => theme.category === category);
}

/**
 * Helper function to get category for an emotion
 */
export function getEmotionCategory(emotion: PrimaryEmotion): EmotionCategory {
  return EMOTION_THEMES[emotion].category;
}

/**
 * Helper function to get all positive emotions
 */
export function getPositiveEmotions(): EmotionTheme[] {
  return getEmotionsByCategory('positive');
}

/**
 * Helper function to get all negative emotions
 */
export function getNegativeEmotions(): EmotionTheme[] {
  return getEmotionsByCategory('negative');
}

/**
 * Helper function to get all mixed emotions
 */
export function getMixedEmotions(): EmotionTheme[] {
  return getEmotionsByCategory('mixed');
}

/**
 * Helper function to validate if a string is a valid emotion
 */
export function isValidEmotion(emotion: string): emotion is PrimaryEmotion {
  return emotion in EMOTION_THEMES;
}

/**
 * Get a random emotion theme (for testing/demos)
 */
export function getRandomEmotionTheme(): EmotionTheme {
  const emotions = Object.keys(EMOTION_THEMES) as PrimaryEmotion[];
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  return EMOTION_THEMES[randomEmotion];
}

/**
 * Get complementary CSS classes for an emotion card
 */
export function getEmotionCardClasses(emotion: PrimaryEmotion): {
  background: string;
  border: string;
  text: string;
  shadow: string;
} {
  const theme = getEmotionTheme(emotion);

  return {
    background: `bg-[${theme.color}]`,
    border: `border-[${theme.accent}]`,
    text: 'text-gray-800',
    shadow: 'shadow-lg hover:shadow-xl'
  };
}

/**
 * Get inline styles for an emotion card (more reliable than dynamic Tailwind classes)
 */
export function getEmotionCardStyles(emotion: PrimaryEmotion): {
  backgroundColor: string;
  borderColor: string;
  accentColor: string;
} {
  const theme = getEmotionTheme(emotion);

  return {
    backgroundColor: theme.color,
    borderColor: theme.accent,
    accentColor: theme.accent
  };
}
