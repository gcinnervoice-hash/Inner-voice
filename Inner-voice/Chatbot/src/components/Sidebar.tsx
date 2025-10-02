import { Settings, PanelLeftClose, PanelLeft } from "lucide-react";
import { Character, CharacterType } from "../types/Character";
import { SwitchRole } from "./SwitchRole";
import { SettingsPanel } from "./SettingsPanel";
import { NatureThemeSelector } from "./NatureThemeSelector";
import { Logo } from "./Logo";
import { useThemeClasses, useTheme } from "../contexts/ThemeContext";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  currentCharacter?: Character;
  onCharacterChange?: (characterType: CharacterType) => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  currentCharacter,
  onCharacterChange
}: SidebarProps) {
  const themeClasses = useThemeClasses();
  const { settings } = useTheme();

  // Use sidebar-specific styles for consistency
  const sidebarStyles = themeClasses.sidebarStyles;

  if (collapsed) {
    return (
      <div className="h-full flex flex-col">
        {/* Collapse Toggle */}
        <div className="p-3">
          <button
            onClick={onToggleCollapse}
            className={`w-full p-2 ${sidebarStyles.buttonBg} rounded-lg border ${sidebarStyles.border} hover:scale-[1.02] hover:shadow-md transition-all duration-200`}
            title="Expand sidebar"
          >
            <PanelLeft className={`w-4 h-4 ${sidebarStyles.textPrimary} mx-auto group-hover:scale-110 transition-transform`} />
          </button>
        </div>

        {/* Switch Role Component for Collapsed State */}
        <SwitchRole
          currentCharacter={currentCharacter}
          onCharacterChange={onCharacterChange}
          collapsed={true}
        />

        {/* Nature Theme Selector for Collapsed State */}
        <NatureThemeSelector collapsed={true} />

        {/* Settings Panel for Collapsed State */}
        <SettingsPanel
          currentCharacter={currentCharacter}
          collapsed={true}
        />

      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Logo Header */}
      <div className="p-6">
        <div className={`rounded-xl p-6 shadow-sm transition-all duration-300 ${sidebarStyles.panelBg} border ${sidebarStyles.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo size="large" showText={false} className="" />
              <div>
                <h2 className={`font-character font-bold transition-all duration-300 ${sidebarStyles.textPrimary} ${sidebarStyles.fontHeading}`}>
                  Inner Voice
                </h2>
                <p className={`mt-2 transition-all duration-300 ${sidebarStyles.textSecondary} ${sidebarStyles.fontButton}`}>
                  Your AI companion sanctuary
                </p>
              </div>
            </div>
            <button
              onClick={onToggleCollapse}
              className={`p-2 rounded-lg transition-all duration-200 ${sidebarStyles.buttonBg} hover:scale-110 hover:shadow-md ${sidebarStyles.textPrimary}`}
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Switch Role Component for Expanded State */}
      <SwitchRole
        currentCharacter={currentCharacter}
        onCharacterChange={onCharacterChange}
        collapsed={false}
      />

      {/* Nature Theme Selector for Expanded State with spacing */}
      <div className="mt-4">
        <NatureThemeSelector collapsed={false} />
      </div>

      {/* Settings Panel for Expanded State */}
      <div className="mt-auto">
        <SettingsPanel
          currentCharacter={currentCharacter}
          collapsed={false}
        />
      </div>
    </div>
  );
}