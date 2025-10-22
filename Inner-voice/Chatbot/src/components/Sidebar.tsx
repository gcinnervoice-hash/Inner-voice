import { Settings, PanelLeftClose, PanelLeft, Calendar, PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  onDoneTalking?: () => void;
  isAnalyzing?: boolean;
  canAnalyze?: boolean;
  messageCount?: number;
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  currentCharacter,
  onCharacterChange,
  onDoneTalking,
  isAnalyzing = false,
  canAnalyze = false,
  messageCount = 0
}: SidebarProps) {
  const themeClasses = useThemeClasses();
  const { settings } = useTheme();
  const navigate = useNavigate();

  // Use sidebar-specific styles for consistency
  const sidebarStyles = themeClasses.sidebarStyles;

  const handleJournalClick = () => {
    navigate('/app/journal');
  };

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

        {/* Emotion Journal Button - Collapsed */}
        <div className="px-3 py-2">
          <button
            onClick={handleJournalClick}
            className={`w-full p-2 ${sidebarStyles.buttonBg} rounded-lg border ${sidebarStyles.border} transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md`}
            title="Emotion Journal"
          >
            <Calendar className={`w-4 h-4 ${sidebarStyles.textPrimary} mx-auto transition-all duration-200`} />
          </button>
        </div>

        {/* Done Talking Button - Collapsed */}
        {onDoneTalking && (
          <div className={`px-3 py-2 transition-opacity duration-500 ${canAnalyze ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
            <button
              onClick={onDoneTalking}
              disabled={!canAnalyze || isAnalyzing}
              className={`w-full p-2 rounded-lg border transition-all duration-200 ${
                canAnalyze && !isAnalyzing
                  ? `${sidebarStyles.buttonBg} ${sidebarStyles.border} hover:scale-[1.02] shadow-sm hover:shadow-md`
                  : 'bg-gray-100 border-gray-300 cursor-not-allowed'
              }`}
              title={canAnalyze ? 'Done Talking - Create Emotion Card' : 'Start a conversation first'}
            >
              {isAnalyzing ? (
                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                <PenLine className={`w-4 h-4 mx-auto transition-all duration-200 ${canAnalyze ? sidebarStyles.textPrimary : 'text-gray-400'}`} />
              )}
            </button>
          </div>
        )}

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

      {/* Emotion Journal Button - Expanded */}
      <div className="px-4 py-3">
        <div className={`rounded-xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${themeClasses.settingsPanelBg}`}>
          <button
            onClick={handleJournalClick}
            className={`w-full flex items-center justify-between p-3 ${sidebarStyles.buttonBg} hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md rounded-xl`}
            title="View your emotion journal"
          >
            <div className="flex items-center gap-2">
              <Calendar className={`w-4 h-4 ${sidebarStyles.textPrimary} transition-all duration-200`} />
              <span className={`font-character font-bold transition-all duration-200 ${sidebarStyles.textPrimary} ${sidebarStyles.fontHeading}`}>
                Emotion Journal
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Done Talking Button - Expanded */}
      {onDoneTalking && (
        <div className={`px-4 py-3 transition-opacity duration-500 ${canAnalyze ? 'opacity-100' : 'opacity-30'}`}>
          <div className={`rounded-xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${themeClasses.settingsPanelBg}`}>
            <button
              onClick={onDoneTalking}
              disabled={!canAnalyze || isAnalyzing}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                canAnalyze && !isAnalyzing
                  ? `${sidebarStyles.buttonBg} hover:scale-[1.02] shadow-sm hover:shadow-md`
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
              title={canAnalyze ? `Create emotion card from ${messageCount} messages` : 'Start a conversation first'}
            >
              <div className="flex items-center gap-2">
                {isAnalyzing ? (
                  <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <PenLine className={`w-4 h-4 transition-all duration-200 ${canAnalyze ? sidebarStyles.textPrimary : 'text-gray-400'}`} />
                )}
                <span className={`font-character font-bold transition-all duration-200 ${canAnalyze ? sidebarStyles.textPrimary : 'text-gray-400'} ${sidebarStyles.fontHeading}`}>
                  {isAnalyzing ? 'Analyzing...' : 'Done Talking'}
                </span>
              </div>
              {canAnalyze && !isAnalyzing && messageCount > 0 && (
                <span className={`text-xs ${sidebarStyles.textSecondary}`}>
                  {messageCount} msgs
                </span>
              )}
            </button>
          </div>
        </div>
      )}

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