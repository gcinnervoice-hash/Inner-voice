import React, { useState, useRef, useEffect } from 'react';
import { Mountain, Trees, Wheat } from 'lucide-react';
import { useTheme, useThemeClasses } from '../contexts/ThemeContext';
import { getAllThemes, NatureThemeType } from '../themes/nature-themes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/Dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/Popover';

interface NatureThemeSelectorProps {
  collapsed?: boolean;
}

export function NatureThemeSelector({ collapsed = false }: NatureThemeSelectorProps): JSX.Element {
  const { settings, updateSetting } = useTheme();
  const themeClasses = useThemeClasses();
  const [isThemeExpanded, setIsThemeExpanded] = useState(false); // Default to collapsed
  const containerRef = useRef<HTMLDivElement>(null);

  // Use sidebar-specific styles for consistency
  const sidebarStyles = themeClasses.sidebarStyles;

  // Click outside to close (only for non-collapsed mode)
  useEffect(() => {
    if (collapsed || !isThemeExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsThemeExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [collapsed, isThemeExpanded]);

  if (collapsed) {
    return (
      <div className="px-3 py-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={`w-full p-2 ${sidebarStyles.buttonBg} rounded-lg border ${sidebarStyles.border} transition-all duration-200 group hover:scale-[1.02] hover:shadow-md`}
              title="Nature Theme"
            >
              <span className={`${themeClasses.themeIcon} text-lg mx-auto group-hover:scale-110 transition-transform`} aria-hidden="true">
                {themeClasses.themeIcon}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent side="right" align="start" className="w-80">
            <div className="space-y-1">
              {/* Header */}
              <div className="flex items-center gap-2 p-3 rounded-lg">
                <span className={`${themeClasses.themeIcon} text-base`} aria-hidden="true">
                  {themeClasses.themeIcon}
                </span>
                <span className={`font-semibold ${sidebarStyles.textPrimary} ${sidebarStyles.fontButton}`}>Nature Theme</span>
                <span className={`${sidebarStyles.fontCaption} opacity-70 ${sidebarStyles.textSecondary}`}>
                  ({themeClasses.themeName})
                </span>
              </div>

              {/* Theme Options */}
              <div className="space-y-1">
                {getAllThemes().map((theme) => {
                  const isSelected = settings.theme === theme.id;
                  const ThemeIcon = theme.id === 'mountain' ? Mountain :
                                   theme.id === 'forest' ? Trees : Wheat;

                  return (
                    <button
                      key={theme.id}
                      onClick={() => updateSetting('theme', theme.id as NatureThemeType)}
                      className={`group relative w-full overflow-hidden rounded-lg border-2 transition-all duration-200 nature-theme-transition ${
                        isSelected
                          ? `border-current shadow-lg scale-[1.02]`
                          : `border-transparent hover:border-current hover:scale-[1.01]`
                      }`}
                      style={{
                        background: theme.gradients.primary,
                        minHeight: '40px'
                      }}
                    >
                      {/* Theme Preview Background */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: theme.textures.background,
                          backgroundSize: 'cover'
                        }}
                      />

                      {/* Theme Content */}
                      <div className="relative z-10 flex items-center justify-between p-2">
                        <div className="flex items-center gap-2">
                          <ThemeIcon
                            className="w-3 h-3 transition-transform group-hover:scale-110"
                            style={{ color: theme.colors.accent }}
                          />
                          <div className="text-left">
                            <div
                              className={`font-medium ${sidebarStyles.fontCaption} transition-all duration-200`}
                              style={{ color: theme.colors.text }}
                            >
                              {theme.displayName} {theme.icon}
                            </div>
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <div
                            className="w-2 h-2 rounded-full transition-all duration-200"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        )}
                      </div>

                      {/* Overlay for better text contrast */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          background: theme.id === 'forest'
                            ? 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className="px-4 py-3" ref={containerRef}>
      <div className={`rounded-xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${themeClasses.settingsPanelBg}`}>
        {/* Nature Theme Header */}
        <button
          onClick={() => setIsThemeExpanded(!isThemeExpanded)}
          className={`w-full flex items-center justify-between p-3 ${themeClasses.buttonBg} hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md rounded-xl`}
        >
          <div className="flex items-center gap-2">
            <span className={`${themeClasses.themeIcon} text-base`} aria-hidden="true">
              {themeClasses.themeIcon}
            </span>
            <span className={`font-character font-bold transition-all duration-200 ${themeClasses.primaryText} ${themeClasses.fontHeading}`}>Nature Theme</span>
            <span className={`${themeClasses.fontCaption} opacity-70 ${themeClasses.secondaryText}`}>
              ({themeClasses.themeName})
            </span>
          </div>
          <div className={`transform transition-all duration-200 ${isThemeExpanded ? 'rotate-180' : ''}`}>
            <svg className={`w-4 h-4 ${themeClasses.primaryText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Expanded Nature Theme Content */}
        {isThemeExpanded && (
          <div className={`px-3 pb-3 space-y-2 border-t ${themeClasses.cardBorder} transition-all duration-300`}>
            <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 gap-2">
                {getAllThemes().map((theme) => {
                  const isSelected = settings.theme === theme.id;
                  const ThemeIcon = theme.id === 'mountain' ? Mountain :
                                   theme.id === 'forest' ? Trees : Wheat;

                  return (
                    <button
                      key={theme.id}
                      onClick={() => updateSetting('theme', theme.id as NatureThemeType)}
                      className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 nature-theme-transition ${
                        isSelected
                          ? `border-current shadow-lg scale-[1.02] ${themeClasses.accentText}`
                          : `border-transparent hover:border-current hover:scale-[1.01] ${themeClasses.cardBorder}`
                      }`}
                      style={{
                        background: theme.gradients.primary,
                        minHeight: '40px'
                      }}
                    >
                      {/* Theme Preview Background */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: theme.textures.background,
                          backgroundSize: 'cover'
                        }}
                      />

                      {/* Theme Content */}
                      <div className="relative z-10 flex items-center justify-between p-2">
                        <div className="flex items-center gap-2">
                          <ThemeIcon
                            className="w-4 h-4 transition-transform group-hover:scale-110"
                            style={{ color: theme.colors.accent }}
                          />
                          <div className="text-left">
                            <div
                              className={`font-semibold ${themeClasses.fontLabel} transition-all duration-300`}
                              style={{ color: theme.colors.text }}
                            >
                              {theme.displayName} {theme.icon}
                            </div>
                            <div
                              className={`text-xs opacity-80 transition-all duration-300`}
                              style={{ color: theme.colors.textSecondary }}
                            >
                              {theme.description}
                            </div>
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <div
                            className="w-3 h-3 rounded-full transition-all duration-300"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        )}
                      </div>

                      {/* Overlay for better text contrast */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          background: theme.id === 'forest'
                            ? 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}