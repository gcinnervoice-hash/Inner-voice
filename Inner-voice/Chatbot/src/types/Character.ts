export interface Character {
  id: string;
  name: string;
  chineseName: string;
  emoji: string;
  personality: CharacterPersonality;
  colorTheme: ColorTheme;
  responseDelay: ResponseTiming;
  specialFeatures: string[];
}

export interface CharacterPersonality {
  role: string;
  traits: string[];
  speakingStyle: string;
  focus: string;
}

export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  messageBorder: string;
  messageBackground: string;
}

export interface ResponseTiming {
  min: number; // minimum delay in milliseconds
  max: number; // maximum delay in milliseconds
  description: string;
}

export type CharacterType = 'sheep' | 'rabbit' | 'fox';

export interface CharacterResponse {
  text: string;
  category: 'supportive' | 'analytical' | 'motivational' | 'breathing' | 'problem-solving';
  trigger?: string[]; // keywords that might trigger this response
}

export interface ConversationContext {
  characterId: string;
  messageHistory: Message[];
  lastInteraction: Date;
  emotionalState?: 'calm' | 'anxious' | 'excited' | 'thoughtful';
}

// Extended Message interface to include character information
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  characterId?: string;
  category?: 'supportive' | 'analytical' | 'motivational' | 'breathing' | 'problem-solving';
}