import { Settings, PanelLeftClose, PanelLeft } from "lucide-react";
import { Character, CharacterType } from "../types/Character";
import { SwitchRole } from "./SwitchRole";

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

  if (collapsed) {
    return (
      <div className="h-full flex flex-col">
        {/* Collapse Toggle */}
        <div className="p-3">
          <button
            onClick={onToggleCollapse}
            className="w-full p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 group"
            title="Expand sidebar"
          >
            <PanelLeft className="w-4 h-4 text-white mx-auto group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Switch Role Component for Collapsed State */}
        <SwitchRole
          currentCharacter={currentCharacter}
          onCharacterChange={onCharacterChange}
          collapsed={true}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Spacious Header */}
      <div className="p-6">
        <div className="bg-white/90 rounded-xl p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-5xl">{currentCharacter?.emoji || '🐑'}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {currentCharacter?.name || 'Daisy'}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {currentCharacter?.personality.role || 'Your caring AI companion'}
                </p>
              </div>
            </div>
            <button
              onClick={onToggleCollapse}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-5 h-5 text-gray-600" />
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

      {/* Settings */}
      <div className="mt-auto p-6">
        <button className="w-full flex items-center justify-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200">
          <Settings className="w-5 h-5 text-white" />
          <span className="text-white font-semibold text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
}