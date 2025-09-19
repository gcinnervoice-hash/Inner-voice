import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Character, CharacterType } from '../types/Character';
import { getAllCharacters } from '../data/characters';

interface SwitchRoleProps {
  currentCharacter?: Character;
  onCharacterChange?: (characterType: CharacterType) => void;
  collapsed?: boolean;
}

export function SwitchRole({ currentCharacter, onCharacterChange, collapsed = false }: SwitchRoleProps) {
  const characters = getAllCharacters();

  const handleValueChange = (value: string) => {
    console.log('SwitchRole: Character changed to:', value);
    onCharacterChange?.(value as CharacterType);
  };

  return (
    <div className={`${collapsed ? 'px-3' : 'px-6'} pb-4`}>
      <div className="space-y-2">
        {!collapsed && (
          <label className="text-sm font-medium text-white/80">Switch Role</label>
        )}

        <Select.Root value={currentCharacter?.id || ''} onValueChange={handleValueChange}>
          <Select.Trigger className={`
            ${collapsed
              ? 'w-full p-2 text-xs'
              : 'w-full p-3 text-sm'
            }
            bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200
            flex items-center justify-between gap-2 backdrop-blur-sm
            border border-white/20 hover:border-white/30
            text-white font-medium
            focus:outline-none focus:ring-2 focus:ring-white/50
          `}>
            <Select.Value>
              <div className="flex items-center gap-2">
                <span className={collapsed ? 'text-lg' : 'text-xl'}>
                  {currentCharacter?.emoji || '🐑'}
                </span>
                {!collapsed && (
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{currentCharacter?.name || 'Daisy'}</span>
                    <span className="text-xs text-white/70">
                      {currentCharacter?.personality.role || 'The Nurturer'}
                    </span>
                  </div>
                )}
              </div>
            </Select.Value>
            <Select.Icon className="text-white/60">
              <ChevronDown className={collapsed ? 'w-3 h-3' : 'w-4 h-4'} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="
              bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20
              p-2 z-50 min-w-[200px]
              data-[state=open]:animate-in data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
              data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
              data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
              data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
            ">
              <Select.ScrollUpButton className="flex items-center justify-center h-6">
                <ChevronUp className="w-4 h-4 text-gray-400" />
              </Select.ScrollUpButton>

              <Select.Viewport className="space-y-1">
                {characters.map((character) => (
                  <Select.Item
                    key={character.id}
                    value={character.id}
                    className="
                      flex items-center gap-3 p-3 rounded-lg cursor-pointer
                      hover:bg-gray-100 focus:bg-gray-100
                      focus:outline-none
                      data-[highlighted]:bg-gray-100
                      transition-colors duration-200
                    "
                  >
                    <Select.ItemText>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{character.emoji}</span>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{character.name}</span>
                          <span className="text-sm text-gray-600">{character.personality.role}</span>
                          <span className="text-xs text-gray-500">
                            {character.personality.traits.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      </div>
                    </Select.ItemText>
                    <Select.ItemIndicator className="ml-auto">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>

              <Select.ScrollDownButton className="flex items-center justify-center h-6">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}