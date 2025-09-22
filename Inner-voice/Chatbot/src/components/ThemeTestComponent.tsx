import React from 'react';
import { useTheme, useThemeClasses } from '../contexts/ThemeContext';
import { getAllThemes } from '../themes/nature-themes';

export function ThemeTestComponent(): JSX.Element {
  const { settings } = useTheme();
  const themeClasses = useThemeClasses();

  return (
    <div className="p-4 space-y-4">
      <h2 className={`text-xl font-bold ${themeClasses.primaryText}`}>
        Nature Theme Test
      </h2>

      <div className="space-y-2">
        <p className={themeClasses.primaryText}>
          Current Theme: {themeClasses.themeName} {themeClasses.themeIcon}
        </p>
        <p className={themeClasses.secondaryText}>
          Theme ID: {settings.theme}
        </p>
        <p className={themeClasses.mutedText}>
          Font Size: {settings.fontSize}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {getAllThemes().map((theme) => (
          <div
            key={theme.id}
            className="p-3 rounded-lg border"
            style={{
              background: theme.gradients.primary,
              borderColor: theme.colors.border,
              color: theme.colors.text
            }}
          >
            <div className="font-semibold">{theme.displayName} {theme.icon}</div>
            <div className="text-sm opacity-80">{theme.description}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className={`font-semibold ${themeClasses.primaryText}`}>
          Current Theme Styles:
        </h3>
        <div className="text-xs space-y-1">
          <div>Background: {themeClasses.natureStyle.background}</div>
          <div>Text Color: {themeClasses.natureStyle.textColor}</div>
          <div>Accent Color: {themeClasses.natureStyle.accentColor}</div>
        </div>
      </div>
    </div>
  );
}