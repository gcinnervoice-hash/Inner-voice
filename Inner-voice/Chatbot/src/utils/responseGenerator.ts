import { Character, CharacterResponse, CharacterType } from '../types/Character';
import { getCharacter } from '../data/characters';

// Character-specific response patterns
const CHARACTER_RESPONSES: Record<CharacterType, CharacterResponse[]> = {
  sheep: [
    {
      text: "Thank you for sharing! I can feel your emotions, let's talk about this together~",
      category: "supportive"
    },
    {
      text: "I understand how you feel, this is definitely something worth thinking about. How would you like me to help you with this?",
      category: "supportive"
    },
    {
      text: "How are you feeling today? Is there anything you'd like to share with me? I'm here to keep you company.",
      category: "supportive"
    },
    {
      text: "That's a wonderful idea! We can explore more possibilities together, what do you think?",
      category: "supportive"
    },
    {
      text: "That sounds really interesting! Tell me more details, I want to understand your thoughts better.",
      category: "supportive"
    }
  ],

  rabbit: [
    {
      text: "I understand your worry, let's slowly analyze this situation together...",
      category: "analytical",
      trigger: ["worry", "anxious", "nervous", "afraid", "scared"]
    },
    {
      text: "It's completely normal to feel this way, we can handle this step by step. What do you think is bothering you the most?",
      category: "supportive",
      trigger: ["bothered", "troubled", "stressed", "pressure"]
    },
    {
      text: "Your feelings are important, can you tell me more details? I want to help you sort through your thoughts.",
      category: "analytical"
    },
    {
      text: "It sounds like your thoughts are a bit scattered. Would you like to try some breathing exercises? I can guide you through a relaxing breathing practice.",
      category: "breathing",
      trigger: ["confused", "thoughts", "overthinking", "breathing", "relax", "calm"]
    },
    {
      text: "This kind of worry is understandable. Let's break it down into smaller parts and handle it bit by bit, okay?",
      category: "analytical",
      trigger: ["worry", "complex", "complicated", "difficult"]
    },
    {
      text: "Luna is here with you. These thoughts are indeed important, let's sort through them slowly.",
      category: "supportive"
    },
    {
      text: "Feeling a bit breathless? Let's do a breathing exercise together to help you find your inner peace.",
      category: "breathing",
      trigger: ["breathless", "suffocating", "can't breathe", "panic"]
    }
  ],

  fox: [
    {
      text: "This sounds like an interesting challenge! Let's think about solutions.",
      category: "problem-solving",
      trigger: ["problem", "difficult", "challenge", "issue"]
    },
    {
      text: "You're more capable than you think! Let's create an action plan and achieve your goals step by step.",
      category: "motivational"
    },
    {
      text: "Every problem has a breakthrough point, let's find it together! You've already started thinking, which is great.",
      category: "problem-solving"
    },
    {
      text: "Excellent! Your idea is very creative. Let's turn it into concrete action steps.",
      category: "motivational"
    },
    {
      text: "This looks like a complex situation. Would you like to use my problem-solving framework to analyze it systematically? I can guide you step by step to create a solution.",
      category: "problem-solving",
      trigger: ["complex", "don't know", "how to", "solve", "method", "strategy"]
    },
    {
      text: "You're already on the right track! Zara believes you can find the perfect solution.",
      category: "motivational"
    },
    {
      text: "Let's look at this problem from a different angle. Sometimes the best answer is just around the corner!",
      category: "problem-solving"
    },
    {
      text: "Feeling stuck? Let's use smart solution tools to break through this deadlock! I'll help you break the problem down into actionable steps.",
      category: "problem-solving",
      trigger: ["stuck", "blocked", "no way", "helpless", "lost"]
    }
  ]
};

// Keywords that might trigger specific response categories
const TRIGGER_KEYWORDS = {
  anxiety: ["worry", "anxious", "nervous", "afraid", "scared", "fear", "fearful", "uneasy", "panic"],
  problems: ["problem", "difficult", "challenge", "trouble", "issue", "hard", "struggle"],
  emotions: ["sad", "happy", "angry", "disappointed", "excited", "frustrated", "depressed", "upset"],
  confusion: ["confused", "don't know", "lost", "uncertain", "unclear", "puzzled", "mixed up"],
  motivation: ["goal", "plan", "want", "hope", "dream", "success", "achieve", "ambition"]
};

// Function to analyze user input for trigger keywords
function analyzeUserInput(userInput: string): string[] {
  if (!userInput || typeof userInput !== 'string') {
    return [];
  }

  const triggers: string[] = [];
  const lowerInput = userInput.toLowerCase();

  try {
    Object.entries(TRIGGER_KEYWORDS).forEach(([category, keywords]) => {
      if (Array.isArray(keywords) && keywords.some(keyword =>
        typeof keyword === 'string' && lowerInput.includes(keyword)
      )) {
        triggers.push(category);
      }
    });
  } catch (error) {
    console.warn('Error analyzing user input:', error);
  }

  return triggers;
}

// Function to get character-appropriate response based on input analysis
export function getCharacterResponse(
  character: Character,
  userInput: string = ""
): CharacterResponse {
  try {
    const characterResponses = CHARACTER_RESPONSES[character.id as CharacterType];

    // Fallback if character responses not found
    if (!characterResponses || !Array.isArray(characterResponses) || characterResponses.length === 0) {
      return {
        text: `Hi! I'm ${character.name}. Thanks for talking with me!`,
        category: "supportive"
      };
    }

    // Simple random selection for now to avoid complex trigger logic
    const randomIndex = Math.floor(Math.random() * characterResponses.length);
    return characterResponses[randomIndex];

  } catch (error) {
    console.error('Error in getCharacterResponse:', error);
    // Safe fallback response
    return {
      text: `Hi! I'm here to chat with you. How are you feeling today?`,
      category: "supportive"
    };
  }
}

// Function to get response with character-specific timing
export function getResponseWithTiming(
  character: Character,
  userInput: string = ""
): Promise<CharacterResponse> {
  return new Promise((resolve) => {
    try {
      const response = getCharacterResponse(character, userInput);

      // Safe delay calculation with fallbacks
      let delay = 2000; // Default 2 second delay
      if (character.responseDelay &&
          typeof character.responseDelay.min === 'number' &&
          typeof character.responseDelay.max === 'number') {
        delay = Math.random() * (character.responseDelay.max - character.responseDelay.min) + character.responseDelay.min;
      }

      setTimeout(() => {
        resolve(response);
      }, Math.max(500, Math.min(delay, 10000))); // Clamp between 0.5-10 seconds
    } catch (error) {
      console.error('Error in getResponseWithTiming:', error);
      // Immediate fallback response on error
      resolve({
        text: `Hi! I'm here to help. How can I support you today?`,
        category: "supportive"
      });
    }
  });
}

// Helper function to get time of day
function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

// Multiple introduction templates for each character
const INTRODUCTION_TEMPLATES: Record<CharacterType, CharacterResponse[]> = {
  sheep: [
    {
      text: `Hi! I'm Daisy, your caring AI companion. I'm here to keep you company and listen to your thoughts. How are you feeling today?`,
      category: "supportive"
    },
    {
      text: `Hello there! I'm Daisy. I'm so glad you're here. This is a safe space where you can share anything on your mind.`,
      category: "supportive"
    },
    {
      text: `Welcome! Daisy here, ready to listen and support you. What's on your heart today?`,
      category: "supportive"
    },
    {
      text: `Hi friend! I'm Daisy, and I'm here to provide comfort and a listening ear. How can I support you right now?`,
      category: "supportive"
    },
    {
      text: `Good morning! I'm Daisy, your gentle companion. Let's start the day together. How are you feeling this morning?`,
      category: "supportive",
      timeOfDay: 'morning'
    },
    {
      text: `Good evening! I'm Daisy. The day is winding down - how are you doing? I'm here to listen.`,
      category: "supportive",
      timeOfDay: 'evening'
    },
    {
      text: `Hello! I'm Daisy. Feeling like you need someone to talk to? I'm right here, ready to keep you company.`,
      category: "supportive"
    },
    {
      text: `Hi there! Daisy checking in. Remember, you're not alone - I'm here to listen and care. What would you like to share?`,
      category: "supportive"
    }
  ],

  rabbit: [
    {
      text: `Hello, I'm Luna. I understand the worries and anxieties in life. Let's slowly sort through your thoughts together.`,
      category: "supportive"
    },
    {
      text: `Hi, I'm Luna. I know how overwhelming thoughts can feel sometimes. Take a deep breath - we'll work through this together.`,
      category: "supportive"
    },
    {
      text: `Welcome. I'm Luna, and I'm here to help you navigate your worries. What's been on your mind lately?`,
      category: "analytical"
    },
    {
      text: `Hello there. Luna here. I specialize in helping with anxiety and worries. Let's take things one step at a time, okay?`,
      category: "supportive"
    },
    {
      text: `Good morning! I'm Luna. Starting a new day can bring new thoughts and worries. Want to talk through them together?`,
      category: "supportive",
      timeOfDay: 'morning'
    },
    {
      text: `Hi! I'm Luna. Still awake and thinking about things? I'm here to help you process those late-night thoughts.`,
      category: "supportive",
      timeOfDay: 'night'
    },
    {
      text: `Hi, I'm Luna. Your feelings are valid, and I'm here to understand them. What would you like to explore today?`,
      category: "supportive"
    },
    {
      text: `Hello. I'm Luna, your thoughtful companion. Feeling anxious or worried? Let's break things down together and find some clarity.`,
      category: "analytical"
    }
  ],

  fox: [
    {
      text: `Hello! I'm Zara! I specialize in helping solve problems and creating plans. Is there any challenge you'd like to tackle together?`,
      category: "motivational"
    },
    {
      text: `Hey there! Zara here, your problem-solving partner! Ready to turn challenges into opportunities? Let's do this!`,
      category: "motivational"
    },
    {
      text: `Hi! I'm Zara, and I'm excited to help you crush your goals! What challenge can we tackle together today?`,
      category: "motivational"
    },
    {
      text: `Welcome! I'm Zara, your clever motivator. Got a problem that needs solving? You've come to the right fox!`,
      category: "problem-solving"
    },
    {
      text: `Good morning! I'm Zara, ready to help you conquer the day! What's on your agenda? Let's create a winning plan!`,
      category: "motivational",
      timeOfDay: 'morning'
    },
    {
      text: `Good evening! I'm Zara. Reflecting on today or planning for tomorrow? Either way, I'm here to help you strategize!`,
      category: "problem-solving",
      timeOfDay: 'evening'
    },
    {
      text: `Hi! Zara here! Feeling stuck on something? Let's break it down and find the breakthrough you need!`,
      category: "problem-solving"
    },
    {
      text: `Hello! I'm Zara, your energetic problem-solver. You're more capable than you think - let's prove it together!`,
      category: "motivational"
    }
  ]
};

// Function to get character introduction message (for first-time interactions)
export function getCharacterIntroduction(character: Character): CharacterResponse {
  const templates = INTRODUCTION_TEMPLATES[character.id as CharacterType];

  if (!templates || templates.length === 0) {
    // Fallback if templates not found
    return {
      text: `Hi! I'm ${character.name}. I'm here to support you. How can I help today?`,
      category: "supportive"
    };
  }

  const currentTime = getTimeOfDay();

  // Filter templates by time of day if specified, otherwise use all templates
  const timeFilteredTemplates = templates.filter(template =>
    !template.timeOfDay || template.timeOfDay === currentTime
  );

  // If no time-filtered templates available, use all templates
  const availableTemplates = timeFilteredTemplates.length > 0 ? timeFilteredTemplates : templates;

  // Randomly select one template
  const randomIndex = Math.floor(Math.random() * availableTemplates.length);
  return availableTemplates[randomIndex];
}