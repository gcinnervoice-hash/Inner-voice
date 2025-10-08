import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NatureThemeType, getTheme, getDefaultTheme } from '../themes/nature-themes';

// Theme and Settings Types
export interface AppSettings {
  theme: NatureThemeType;
  fontSize: 'small' | 'medium' | 'large';
  showTimestamps: boolean;
}

export interface ThemeContextType {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetSettings: () => void;
}

// Default settings
export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'forest',
  fontSize: 'medium',
  showTimestamps: true
};

// Local storage key
const SETTINGS_STORAGE_KEY = 'inner-voice-settings';

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to load settings from localStorage
const loadSettingsFromStorage = (): AppSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure all required properties exist with fallbacks
      // Validate that the theme is a valid nature theme
      const validThemes: NatureThemeType[] = ['mountain', 'forest'];
      const themeValue = validThemes.includes(parsed.theme) ? parsed.theme : DEFAULT_SETTINGS.theme;

      return {
        theme: themeValue,
        fontSize: parsed.fontSize || DEFAULT_SETTINGS.fontSize,
        showTimestamps: parsed.showTimestamps !== undefined ? parsed.showTimestamps : DEFAULT_SETTINGS.showTimestamps
      };
    }
  } catch (error) {
    console.warn('Failed to load settings from localStorage:', error);
  }
  return DEFAULT_SETTINGS;
};

// Helper function to save settings to localStorage
const saveSettingsToStorage = (settings: AppSettings): void => {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings to localStorage:', error);
  }
};

// Theme Provider Component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize settings from localStorage
  const [settings, setSettings] = useState<AppSettings>(() => loadSettingsFromStorage());

  // Update a specific setting
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      saveSettingsToStorage(newSettings);
      return newSettings;
    });
  };

  // Reset all settings to defaults
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    saveSettingsToStorage(DEFAULT_SETTINGS);
  };

  // Apply theme classes to document body and html element
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Ensure we have a valid theme, fallback to default if not
    let currentTheme;
    try {
      currentTheme = getTheme(settings.theme);
      if (!currentTheme) {
        console.warn(`Invalid theme: ${settings.theme}, falling back to forest`);
        currentTheme = getDefaultTheme();
      }
    } catch (error) {
      console.error('Error getting theme:', error);
      currentTheme = getDefaultTheme();
    }

    // Remove existing theme classes
    root.classList.remove('theme-mountain', 'theme-forest');
    body.classList.remove('theme-mountain', 'theme-forest');

    // Add current theme class
    const themeClass = `theme-${settings.theme}`;
    root.classList.add(themeClass);
    body.classList.add(themeClass);

    // Apply font size class
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${settings.fontSize}`);

    // Apply custom properties for easy CSS access
    root.style.setProperty('--app-theme', settings.theme);
    root.style.setProperty('--app-font-size', settings.fontSize);
    root.style.setProperty('--show-timestamps', settings.showTimestamps ? '1' : '0');

    // Apply font scale based on user preference
    const fontScaleValue = settings.fontSize === 'small' ? '0.875' :
                          settings.fontSize === 'large' ? '1.125' : '1';
    root.style.setProperty('--font-scale', fontScaleValue);

    // Apply nature theme custom properties
    root.style.setProperty('--nature-primary', currentTheme.colors.primary);
    root.style.setProperty('--nature-secondary', currentTheme.colors.secondary);
    root.style.setProperty('--nature-accent', currentTheme.colors.accent);
    root.style.setProperty('--nature-background', currentTheme.colors.background);
    root.style.setProperty('--nature-surface', currentTheme.colors.surface);
    root.style.setProperty('--nature-text', currentTheme.colors.text);
    root.style.setProperty('--nature-text-secondary', currentTheme.colors.textSecondary);
    root.style.setProperty('--nature-text-muted', currentTheme.colors.textMuted);
    root.style.setProperty('--nature-border', currentTheme.colors.border);

    // Apply gradient custom properties
    root.style.setProperty('--nature-gradient-primary', currentTheme.gradients.primary);
    root.style.setProperty('--nature-gradient-sidebar', currentTheme.gradients.sidebar);
    root.style.setProperty('--nature-gradient-chat-area', currentTheme.gradients.chatArea);
    root.style.setProperty('--nature-gradient-card', currentTheme.gradients.card);
    root.style.setProperty('--nature-gradient-input', currentTheme.gradients.input);
    root.style.setProperty('--nature-gradient-button', currentTheme.gradients.button);
    root.style.setProperty('--nature-gradient-button-hover', currentTheme.gradients.buttonHover);

    // Apply texture custom properties
    root.style.setProperty('--nature-texture-background', currentTheme.textures.background);
    root.style.setProperty('--nature-texture-overlay', currentTheme.textures.overlay);
    root.style.setProperty('--nature-texture-pattern', currentTheme.textures.pattern);

    // Apply enhanced layered texture properties
    root.style.setProperty('--nature-texture-layer1', currentTheme.textures.layer1);
    root.style.setProperty('--nature-texture-layer2', currentTheme.textures.layer2);
    root.style.setProperty('--nature-texture-layer3', currentTheme.textures.layer3);
    root.style.setProperty('--nature-texture-grain', currentTheme.textures.grain);
    root.style.setProperty('--nature-texture-lighting', currentTheme.textures.lighting);

    // Apply effect properties
    root.style.setProperty('--nature-glow', currentTheme.effects.glow);
    root.style.setProperty('--nature-glow-intensity', currentTheme.effects.glowIntensity);
    root.style.setProperty('--nature-shadow', currentTheme.effects.shadow);
    root.style.setProperty('--nature-shimmer', currentTheme.effects.shimmer);
  }, [settings]);

  const contextValue: ThemeContextType = {
    settings,
    updateSetting,
    resetSettings
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper hook to get theme-specific class names
export const useThemeClasses = () => {
  const { settings } = useTheme();

  // Ensure we always have a valid theme
  let currentTheme;
  try {
    currentTheme = getTheme(settings.theme);
    if (!currentTheme) {
      console.warn(`Invalid theme in useThemeClasses: ${settings.theme}, using default`);
      currentTheme = getDefaultTheme();
    }
  } catch (error) {
    console.error('Error getting theme in useThemeClasses:', error);
    currentTheme = getDefaultTheme();
  }

  // Get theme-specific colors
  const getThemeColors = () => {
    switch (settings.theme) {
      case 'mountain':
        return {
          primary: 'text-gray-700',
          secondary: 'text-gray-600',
          muted: 'text-gray-500',
          primaryBg: 'bg-gray-50',
          surfaceBg: 'bg-white',
          cardBg: 'bg-white/95',
          border: 'border-gray-200',
          accent: 'text-blue-600',
        };
      case 'forest':
        return {
          primary: 'text-white',
          secondary: 'text-gray-100',
          muted: 'text-gray-300',
          primaryBg: 'bg-green-900',
          surfaceBg: 'bg-green-800',
          cardBg: 'bg-green-800/90',
          border: 'border-black',
          accent: 'text-amber-400',
        };
      default:
        return {
          primary: 'text-white',
          secondary: 'text-gray-100',
          muted: 'text-gray-300',
          primaryBg: 'bg-green-900',
          surfaceBg: 'bg-green-800',
          cardBg: 'bg-green-800/90',
          border: 'border-black',
          accent: 'text-amber-400',
        };
    }
  };

  const colors = getThemeColors();

  return {
    // Background classes using CSS custom properties
    primaryBg: `${colors.primaryBg}`,
    sidebarBg: `${colors.surfaceBg}`,
    chatAreaBg: `${colors.primaryBg}`,

    // Text classes
    primaryText: colors.primary,
    secondaryText: colors.secondary,
    mutedText: colors.muted,
    accentText: colors.accent,

    // Card/Panel classes
    cardBg: `${colors.cardBg} backdrop-blur-sm`,
    cardBorder: colors.border,

    // Input classes
    inputBg: `${colors.cardBg} ${colors.primary} placeholder-opacity-60`,

    // Button classes
    buttonBg: `${colors.cardBg} hover:scale-105 transition-all duration-200`,

    // Settings panel specific
    settingsPanelBg: `${colors.cardBg} backdrop-blur-sm ${colors.border}`,

    // Nature theme specific styles with CSS variables
    natureStyle: {
      background: `var(--nature-gradient-primary), var(--nature-texture-background)`,
      sidebarBackground: `var(--nature-gradient-sidebar)`,
      chatBackground: `var(--nature-gradient-chat-area), var(--nature-texture-overlay)`,
      cardBackground: `var(--nature-gradient-card)`,
      inputBackground: `var(--nature-gradient-input)`,
      buttonBackground: `var(--nature-gradient-button)`,
      buttonHoverBackground: `var(--nature-gradient-button-hover)`,
      textColor: `var(--nature-text)`,
      secondaryTextColor: `var(--nature-text-secondary)`,
      mutedTextColor: `var(--nature-text-muted)`,
      borderColor: `var(--nature-border)`,
      accentColor: `var(--nature-accent)`,
    },

    // Unified Semantic Font Size System - CSS Variable Based
    fontMessage: 'text-message', // For chat messages - main content
    fontInput: 'text-input', // For input fields - matches message scale
    fontLabel: 'text-label', // For form labels and settings
    fontCaption: 'text-caption', // For timestamps and small text
    fontHeading: 'text-heading', // For section headings
    fontButton: 'text-button', // For button text

    // Legacy font size classes - for backward compatibility
    fontSizeBase: 'text-input', // Maps to semantic input size
    fontSizeLarge: 'text-message', // Maps to semantic message size
    fontSizeSmall: 'text-label', // Maps to semantic label size
    fontSizeXLarge: 'text-heading', // Maps to semantic heading size

    // Theme information
    currentTheme: currentTheme,
    themeName: currentTheme.displayName,
    themeIcon: currentTheme.icon,

    // Area-specific style bundles for easy management
    sidebarStyles: {
      // Sidebar-specific styles for consistent theming
      containerBg: `${colors.surfaceBg}`,
      panelBg: `${colors.cardBg} backdrop-blur-sm`,
      buttonBg: `${colors.cardBg} hover:scale-[1.02] transition-all duration-200`,
      textPrimary: colors.primary,
      textSecondary: colors.secondary,
      textMuted: colors.muted,
      border: colors.border,
      fontHeading: 'text-heading',
      fontLabel: 'text-label',
      fontButton: 'text-button',
      fontCaption: 'text-caption',
    },

    chatAreaStyles: {
      // Chat area specific styles
      containerBg: `${colors.primaryBg}`,
      messageBg: `${colors.cardBg} backdrop-blur-sm`,
      inputBg: `${colors.cardBg} ${colors.primary} placeholder-opacity-60`,
      textPrimary: colors.primary,
      textSecondary: colors.secondary,
      border: colors.border,
      fontMessage: 'text-message',
      fontInput: 'text-input',
      fontCaption: 'text-caption',
    },

    // Modal/Dialog specific styles
    modalStyles: {
      overlayBg: 'bg-black/50 backdrop-blur-sm',
      contentBg: `${colors.cardBg} backdrop-blur-md`,
      border: colors.border,
      textPrimary: colors.primary,
      textSecondary: colors.secondary,
      fontHeading: 'text-heading',
      fontLabel: 'text-label',
      fontButton: 'text-button',
    },
  };
};