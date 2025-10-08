export type NatureThemeType = 'mountain' | 'forest';

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
    // Enhanced layered textures for realism
    layer1: string;  // Base atmosphere
    layer2: string;  // Mid-ground elements
    layer3: string;  // Foreground details
    grain: string;   // Organic surface noise
    lighting: string; // Ambient light overlay
  };
  effects: {
    glow: string;           // Ambient glow color
    glowIntensity: string;  // Glow strength
    shadow: string;         // Depth shadow
    shimmer: string;        // Subtle shine effect
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
    description: 'Serene alpine retreat with crystalline snow and morning mist',
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
      primary: 'linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 20%, #F9FAFB 50%, #F3F4F6 100%)',
      sidebar: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.95) 100%)',
      chatArea: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 50%, #F3F4F6 100%)',
      card: 'rgba(255, 255, 255, 0.92)',
      input: 'rgba(249, 250, 251, 0.95)',
      button: 'rgba(243, 244, 246, 0.90)',
      buttonHover: 'rgba(224, 242, 254, 0.95)',
    },
    textures: {
      // Legacy textures
      background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107, 114, 128, 0.06) 0%, transparent 50%)',
      overlay: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(243, 244, 246, 0.08) 100%)',
      pattern: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(107, 114, 128, 0.03) 2px, rgba(107, 114, 128, 0.03) 4px)',
      // Enhanced layered textures
      layer1: 'radial-gradient(ellipse at 50% 100%, rgba(59, 130, 246, 0.12) 0%, rgba(224, 242, 254, 0.08) 40%, transparent 70%)', // Sky atmosphere
      layer2: 'linear-gradient(to bottom, transparent 0%, rgba(148, 163, 184, 0.15) 40%, rgba(203, 213, 225, 0.25) 70%, transparent 100%), radial-gradient(ellipse at 30% 60%, rgba(148, 163, 184, 0.20) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(148, 163, 184, 0.15) 0%, transparent 50%)', // Mountain silhouettes
      layer3: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255, 255, 255, 0.4) 1px, rgba(255, 255, 255, 0.4) 2px, transparent 2px, transparent 4px), repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(226, 232, 240, 0.3) 1px, rgba(226, 232, 240, 0.3) 2px)', // Snow crystalline texture
      grain: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2.5\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.08\'/%3E%3C/svg%3E")', // Stone grain
      lighting: 'radial-gradient(circle at 30% 20%, rgba(191, 219, 254, 0.25) 0%, transparent 50%), linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, transparent 30%, rgba(148, 163, 184, 0.1) 100%)', // Morning light
    },
    effects: {
      glow: 'rgba(59, 130, 246, 0.15)',
      glowIntensity: '0 0 20px rgba(59, 130, 246, 0.1), 0 0 40px rgba(191, 219, 254, 0.08)',
      shadow: '0 8px 32px rgba(100, 116, 139, 0.12), 0 2px 8px rgba(148, 163, 184, 0.08)',
      shimmer: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, transparent 30%, transparent 70%, rgba(255, 255, 255, 0.3) 100%)',
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
    description: 'Deep woodland sanctuary with dappled sunlight and moss-covered paths',
    colors: {
      primary: '#065F46',      // Deep forest green
      secondary: '#10B981',    // Leaf green
      accent: '#92400E',       // Earth brown
      background: '#064E3B',   // Dark forest
      surface: '#047857',      // Medium forest
      text: '#F9FAFB',         // Light text
      textSecondary: '#D1FAE5', // Light green
      textMuted: '#6EE7B7',    // Muted green
      border: '#000000',       // Black border
    },
    gradients: {
      primary: 'linear-gradient(180deg, #0A5D47 0%, #064E3B 30%, #053B2F 60%, #042F26 100%)',
      sidebar: 'linear-gradient(135deg, #064E3B 0%, #053B2F 50%, #042F26 100%)',
      chatArea: 'linear-gradient(135deg, #064E3B 0%, #053B2F 50%, #042F26 100%)',
      card: 'rgba(4, 120, 87, 0.85)',
      input: 'rgba(6, 95, 70, 0.92)',
      button: 'rgba(4, 120, 87, 0.90)',
      buttonHover: 'rgba(16, 185, 129, 0.85)',
    },
    textures: {
      // Legacy textures
      background: 'radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(146, 64, 14, 0.08) 0%, transparent 50%)',
      overlay: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 95, 70, 0.12) 100%)',
      pattern: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.20) 1px, transparent 0)',
      // Enhanced layered textures
      layer1: 'radial-gradient(ellipse at 50% 0%, rgba(6, 78, 59, 0.6) 0%, rgba(4, 78, 59, 0.4) 30%, transparent 60%)', // Canopy shadows
      layer2: 'radial-gradient(ellipse at 25% 35%, rgba(251, 191, 36, 0.12) 0%, transparent 25%), radial-gradient(ellipse at 65% 45%, rgba(251, 191, 36, 0.08) 0%, transparent 20%), radial-gradient(ellipse at 45% 70%, rgba(251, 191, 36, 0.10) 0%, transparent 22%), radial-gradient(ellipse at 80% 25%, rgba(251, 191, 36, 0.06) 0%, transparent 18%)', // Sunbeams through canopy
      layer3: 'repeating-linear-gradient(135deg, transparent 0px, transparent 3px, rgba(5, 150, 105, 0.08) 3px, rgba(5, 150, 105, 0.08) 6px), repeating-linear-gradient(45deg, transparent 0px, transparent 4px, rgba(6, 95, 70, 0.12) 4px, rgba(6, 95, 70, 0.12) 8px)', // Leaf texture patterns
      grain: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.8\' numOctaves=\'5\' seed=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.15\'/%3E%3C/svg%3E")', // Wood/bark grain
      lighting: 'radial-gradient(ellipse at 40% 30%, rgba(16, 185, 129, 0.18) 0%, transparent 40%), radial-gradient(ellipse at 70% 60%, rgba(251, 191, 36, 0.12) 0%, transparent 35%), linear-gradient(to bottom, transparent 0%, rgba(5, 150, 105, 0.08) 100%)', // Ambient forest glow
    },
    effects: {
      glow: 'rgba(16, 185, 129, 0.25)',
      glowIntensity: '0 0 30px rgba(16, 185, 129, 0.15), 0 0 60px rgba(5, 150, 105, 0.10), inset 0 0 20px rgba(16, 185, 129, 0.05)',
      shadow: '0 12px 40px rgba(4, 47, 38, 0.30), 0 4px 12px rgba(4, 78, 59, 0.25), inset 0 1px 0 rgba(16, 185, 129, 0.1)',
      shimmer: 'linear-gradient(135deg, rgba(110, 231, 183, 0.15) 0%, transparent 40%, transparent 60%, rgba(209, 250, 229, 0.10) 100%)',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      headingFont: 'Inter, system-ui, sans-serif',
    },
    icon: '🌲',
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