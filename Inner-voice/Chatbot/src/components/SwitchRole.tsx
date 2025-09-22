import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Character, CharacterType } from '../types/Character';
import { getAllCharacters } from '../data/characters';
import { useThemeClasses } from '../contexts/ThemeContext';

// Development debug utility
const DEBUG = process.env.NODE_ENV === 'development';
const debugLog = (...args: any[]): void => {
  if (DEBUG) {
    console.log('[SwitchRole Debug]', ...args);
  }
};

interface SwitchRoleProps {
  currentCharacter?: Character;
  onCharacterChange?: (characterType: CharacterType) => void;
  collapsed?: boolean;
}

export function SwitchRole({ currentCharacter, onCharacterChange, collapsed = false }: SwitchRoleProps): JSX.Element {
  const characters = getAllCharacters();
  const themeClasses = useThemeClasses();

  // Use sidebar-specific styles for consistency
  const sidebarStyles = themeClasses.sidebarStyles;

  const handleValueChange = (value: string): void => {
    debugLog('Character changed to:', value);
    onCharacterChange?.(value as CharacterType);
  };

  return (
    <div className={`${collapsed ? 'px-3' : 'px-6'} pb-4`}>
      <div className="space-y-2">
        {!collapsed && (
          <label className={`font-semibold ${sidebarStyles.textPrimary} ${sidebarStyles.fontLabel} opacity-90`}>Switch Role</label>
        )}

        <Select.Root value={currentCharacter?.id || ''} onValueChange={handleValueChange}>
          <Select.Trigger className={`
            ${collapsed
              ? 'w-full p-2'
              : 'w-full p-3'
            }
            ${sidebarStyles.fontButton}
            ${sidebarStyles.buttonBg} rounded-lg
            flex items-center justify-between gap-2
            border ${sidebarStyles.border}
            ${sidebarStyles.textPrimary} font-semibold
            focus:outline-none focus:ring-2 focus:ring-green-400/50
            hover:scale-[1.02] hover:shadow-md
          `}>
            <Select.Value>
              <div className="flex items-center gap-2">
                <span className={collapsed ? 'text-lg' : 'text-xl'}>
                  {currentCharacter?.emoji || '🐑'}
                </span>
                {!collapsed && (
                  <div className="flex flex-col items-start">
                    <span className={`font-medium ${sidebarStyles.fontButton}`}>{currentCharacter?.name || 'Daisy'}</span>
                    <span className={`${sidebarStyles.fontCaption} ${sidebarStyles.textMuted}`}>
                      {currentCharacter?.personality.role || 'The Nurturer'}
                    </span>
                  </div>
                )}
              </div>
            </Select.Value>
            <Select.Icon className={`${sidebarStyles.textMuted}`}>
              <ChevronDown className={collapsed ? 'w-3 h-3' : 'w-4 h-4'} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className={`
              ${sidebarStyles.panelBg} rounded-lg shadow-xl border ${sidebarStyles.border}
              p-2 z-50 min-w-[200px]
              data-[state=open]:animate-in data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
              data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
              data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
              data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
            `}>
              <Select.ScrollUpButton className="flex items-center justify-center h-6">
                <ChevronUp className={`w-4 h-4 ${sidebarStyles.textMuted}`} />
              </Select.ScrollUpButton>

              <Select.Viewport className="space-y-1">
                {characters.map((character) => (
                  <Select.Item
                    key={character.id}
                    value={character.id}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg cursor-pointer
                      hover:${sidebarStyles.buttonBg} focus:${sidebarStyles.buttonBg}
                      focus:outline-none
                      data-[highlighted]:${sidebarStyles.buttonBg}
                      transition-colors duration-200
                    `}
                  >
                    <Select.ItemText>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{character.emoji}</span>
                        <div className="flex flex-col">
                          <span className={`font-semibold ${sidebarStyles.textPrimary} ${sidebarStyles.fontButton}`}>{character.name}</span>
                          <span className={`${sidebarStyles.textSecondary} ${sidebarStyles.fontCaption}`}>{character.personality.role}</span>
                          <span className={`${sidebarStyles.textMuted} ${sidebarStyles.fontCaption}`}>
                            {character.personality.traits.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      </div>
                    </Select.ItemText>
                    <Select.ItemIndicator className="ml-auto">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>

              <Select.ScrollDownButton className="flex items-center justify-center h-6">
                <ChevronDown className={`w-4 h-4 ${sidebarStyles.textMuted}`} />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}