export type NatureThemeType = 'mountain' | 'forest' | 'plain';

export interface NatureTheme {
  id: NatureThemeType;
  name: string;
  displayName: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
  };
  gradients: {
    primary: string;
    sidebar: string;
    chatArea: string;
    card: string;
    input: string;
    button: string;
    buttonHover: string;
  };
  textures: {
    background: string;
    overlay: string;
    pattern: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
  };
  icon: string;
}

export const NATURE_THEMES: Record<NatureThemeType, NatureTheme> = {
  mountain: {
    id: 'mountain',
    name: 'mountain',
    displayName: 'Mountain',
    description: 'Clean, minimal with stone and snow aesthetics',
    colors: {
      primary: '#6B7280',      // Stone gray
      secondary: '#F9FAFB',    // Snow white
      accent: '#3B82F6',       // Sky blue
      background: '#F3F4F6',   // Light gray
      surface: '#FFFFFF',      // Pure white
      text: '#1F2937',         // Dark gray
      textSecondary: '#4B5563', // Medium gray
      textMuted: '#6B7280',    // Stone gray
      border: '#E5E7EB',       // Light border
    },
    gradients: {
      primary: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 50%, #D1D5DB 100%)',
      sidebar: 'linear-gradient(180deg, #F9FAFB 0%, #F3F4F6 100%)',
      chatArea: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
      card: 'rgba(255, 255, 255, 0.95)',
      input: 'rgba(249, 250, 251, 0.95)',
      button: 'rgba(243, 244, 246, 0.95)',
      buttonHover: 'rgba(229, 231, 235, 0.95)',
    },
    textures: {
      background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 114, 128, 0.05) 0%, transparent 50%)',
      overlay: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(243, 244, 246, 0.05) 100%)',
      pattern: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(107, 114, 128, 0.02) 2px, rgba(107, 114, 128, 0.02) 4px)',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      headingFont: 'Inter, system-ui, sans-serif',
    },
    icon: '🏔️',
  },

  forest: {
    id: 'forest',
    name: 'forest',
    displayName: 'Forest',
    description: 'Rich, organic with deep greens and earth tones',
    colors: {
      primary: '#065F46',      // Deep forest green
      secondary: '#10B981',    // Leaf green
      accent: '#92400E',       // Earth brown
      background: '#064E3B',   // Dark forest
      surface: '#047857',      // Medium forest
      text: '#F9FAFB',         // Light text
      textSecondary: '#D1FAE5', // Light green
      textMuted: '#6EE7B7',    // Muted green
      border: '#047857',       // Forest border
    },
    gradients: {
      primary: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #065F46 100%)',
      sidebar: 'linear-gradient(180deg, #047857 0%, #065F46 100%)',
      chatArea: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
      card: 'rgba(4, 120, 87, 0.90)',
      input: 'rgba(6, 95, 70, 0.95)',
      button: 'rgba(4, 120, 87, 0.95)',
      buttonHover: 'rgba(16, 185, 129, 0.95)',
    },
    textures: {
      background: 'radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(146, 64, 14, 0.06) 0%, transparent 50%)',
      overlay: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 95, 70, 0.08) 100%)',
      pattern: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      headingFont: 'Inter, system-ui, sans-serif',
    },
    icon: '🌲',
  },

  plain: {
    id: 'plain',
    name: 'plain',
    displayName: 'Plain',
    description: 'Open, bright with grasslands and golden hour warmth',
    colors: {
      primary: '#16A34A',      // Grass green
      secondary: '#F59E0B',    // Golden yellow
      accent: '#0EA5E9',       // Sky blue
      background: '#FEFCE8',   // Light yellow
      surface: '#FEF3C7',      // Warm yellow
      text: '#1F2937',         // Dark text
      textSecondary: '#374151', // Medium dark
      textMuted: '#6B7280',    // Muted gray
      border: '#FDE68A',       // Golden border
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FEFCE8 0%, #FEF3C7 50%, #FDE68A 100%)',
      sidebar: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)',
      chatArea: 'linear-gradient(135deg, #FFFBEB 0%, #FEFCE8 100%)',
      card: 'rgba(254, 243, 199, 0.95)',
      input: 'rgba(255, 251, 235, 0.95)',
      button: 'rgba(253, 230, 138, 0.95)',
      buttonHover: 'rgba(251, 191, 36, 0.95)',
    },
    textures: {
      background: 'radial-gradient(circle at 40% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 163, 74, 0.06) 0%, transparent 50%)',
      overlay: 'linear-gradient(135deg, rgba(245, 158, 11, 0.03) 0%, rgba(22, 163, 74, 0.02) 100%)',
      pattern: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(22, 163, 74, 0.03) 3px, rgba(22, 163, 74, 0.03) 6px)',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      headingFont: 'Inter, system-ui, sans-serif',
    },
    icon: '🌾',
  },
};

export const getTheme = (themeType: NatureThemeType): NatureTheme => {
  return NATURE_THEMES[themeType];
};

export const getAllThemes = (): NatureTheme[] => {
  return Object.values(NATURE_THEMES);
};

export const getDefaultTheme = (): NatureTheme => {
  return NATURE_THEMES.forest;
};