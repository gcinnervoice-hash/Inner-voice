import { Character, CharacterType } from '../types/Character';

export const CHARACTERS: Record<CharacterType, Character> = {
  sheep: {
    id: 'sheep',
    name: 'Daisy',
    chineseName: '黛西',
    emoji: '🐑',
    personality: {
      role: 'The Nurturer',
      traits: ['gentle', 'supportive', 'comforting', 'warm', 'caring'],
      speakingStyle: 'Warm and caring, uses soft language, focuses on emotional comfort',
      focus: 'Emotional support and daily check-ins, providing comfort and validation'
    },
    colorTheme: {
      primary: '#FFA0C1', // Pink
      secondary: '#ffffff', // White
      accent: '#FFB8D1',   // Light pink
      messageBorder: 'border-pink-200',
      messageBackground: 'bg-pink-50/95'
    },
    responseDelay: {
      min: 2500,
      max: 3500,
      description: 'Gentle, moderate timing for nurturing responses'
    },
    specialFeatures: ['emotional validation', 'daily check-ins', 'comfort responses']
  },

  rabbit: {
    id: 'rabbit',
    name: 'Luna',
    chineseName: '月月',
    emoji: '🐰',
    personality: {
      role: 'The Thoughtful Worrier',
      traits: ['sensitive', 'detail-oriented', 'empathetic', 'anxious', 'understanding'],
      speakingStyle: 'Gentle but thoughtful, acknowledges concerns, validates anxious feelings',
      focus: 'Helps process worries, validates anxiety, provides practical coping strategies'
    },
    colorTheme: {
      primary: '#B19CD9', // Lavender
      secondary: '#9B87C9', // Gray-lavender
      accent: '#D1C4E9',   // Light lavender
      messageBorder: 'border-purple-200',
      messageBackground: 'bg-purple-50/95'
    },
    responseDelay: {
      min: 4000,
      max: 5500,
      description: 'Slower, more thoughtful responses reflecting careful consideration'
    },
    specialFeatures: ['anxiety support', 'breathing exercises', 'worry categorization', 'coping strategies']
  },

  fox: {
    id: 'fox',
    name: 'Zara',
    chineseName: '灵灵',
    emoji: '🦊',
    personality: {
      role: 'The Clever Motivator',
      traits: ['smart', 'confident', 'playful', 'solution-focused', 'energetic'],
      speakingStyle: 'Encouraging and clever, uses analogies, slightly playful but focused',
      focus: 'Problem-solving, motivation, building confidence, celebrating achievements'
    },
    colorTheme: {
      primary: '#FF6B35', // Orange-red
      secondary: '#ffffff', // White
      accent: '#FF8C69',   // Light orange
      messageBorder: 'border-orange-200',
      messageBackground: 'bg-orange-50/95'
    },
    responseDelay: {
      min: 1800,
      max: 2800,
      description: 'Quick, energetic responses reflecting confident problem-solving nature'
    },
    specialFeatures: ['problem-solving framework', 'motivation boost', 'achievement celebration', 'confidence building']
  }
};

// Helper functions for working with characters
export const getCharacter = (type: CharacterType): Character => {
  return CHARACTERS[type];
};

export const getAllCharacters = (): Character[] => {
  return Object.values(CHARACTERS);
};

export const getCharacterById = (id: string): Character | undefined => {
  return getAllCharacters().find(char => char.id === id);
};

export const getDefaultCharacter = (): Character => {
  return CHARACTERS.sheep; // Daisy is the default
};

// Character switching order for keyboard shortcuts
export const CHARACTER_ORDER: CharacterType[] = ['sheep', 'rabbit', 'fox'];

export const getCharacterByIndex = (index: number): Character => {
  const type = CHARACTER_ORDER[index % CHARACTER_ORDER.length];
  return CHARACTERS[type];
};