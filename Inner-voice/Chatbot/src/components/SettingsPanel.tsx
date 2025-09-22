import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Character } from '../types/Character';
import { useTheme, useThemeClasses } from '../contexts/ThemeContext';
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

interface SettingsPanelProps {
  currentCharacter?: Character;
  collapsed?: boolean;
}

export function SettingsPanel({ currentCharacter, collapsed = false }: SettingsPanelProps): JSX.Element {
  const { settings, updateSetting } = useTheme();
  const themeClasses = useThemeClasses();
  const [isExpanded, setIsExpanded] = useState(false);

  // Use sidebar-specific styles for consistency
  const sidebarStyles = themeClasses.sidebarStyles;

  if (collapsed) {
    return (
      <div className="px-3 py-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={`w-full p-2 ${sidebarStyles.buttonBg} rounded-lg border ${sidebarStyles.border} transition-all duration-200 group hover:scale-[1.02] hover:shadow-md`}
              title="Settings"
            >
              <Settings className={`w-4 h-4 ${sidebarStyles.textPrimary} mx-auto group-hover:scale-110 transition-transform`} />
            </button>
          </PopoverTrigger>
          <PopoverContent side="right" align="start" className="w-80">
            <div className="space-y-1">
              {/* Header */}
              <div className="flex items-center gap-2 p-3 rounded-lg">
                <Settings className={`w-4 h-4 ${sidebarStyles.textPrimary}`} />
                <span className={`font-semibold ${sidebarStyles.textPrimary} ${sidebarStyles.fontButton}`}>Settings</span>
              </div>

              {/* Font Size Section */}
              <div className="p-3 rounded-lg transition-all duration-200 hover:${sidebarStyles.buttonBg}">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${sidebarStyles.textPrimary} ${sidebarStyles.fontCaption}`}>Font Size</span>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', e.target.value as 'small' | 'medium' | 'large')}
                    className={`border ${sidebarStyles.border} ${sidebarStyles.panelBg} ${sidebarStyles.textPrimary} rounded px-2 py-1 ${sidebarStyles.fontCaption} font-medium transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-green-400/50 focus:outline-none`}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>

              {/* Timestamps Section */}
              <div className="p-3 rounded-lg transition-all duration-200 hover:${sidebarStyles.buttonBg}">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${sidebarStyles.textPrimary} ${sidebarStyles.fontCaption}`}>Show Timestamps</span>
                  <button
                    onClick={() => updateSetting('showTimestamps', !settings.showTimestamps)}
                    className={`w-8 h-4 rounded-full transition-all duration-200 hover:scale-110 ${
                      settings.showTimestamps ? 'bg-green-500 shadow-lg' : 'bg-gray-400'
                    }`}
                  >
                    <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform ${
                      settings.showTimestamps ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <div className={`rounded-xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${themeClasses.settingsPanelBg}`}>
        {/* Settings Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between p-4 ${themeClasses.buttonBg} hover:scale-[1.01] transition-all duration-200 rounded-xl`}
        >
          <div className="flex items-center gap-2">
            <Settings className={`w-5 h-5 ${themeClasses.primaryText}`} />
            <span className={`font-character font-bold transition-all duration-300 ${themeClasses.primaryText} ${themeClasses.fontHeading}`}>Settings</span>
          </div>
          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className={`w-4 h-4 ${themeClasses.primaryText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Expanded Settings Content */}
        {isExpanded && (
          <div className={`px-4 pb-4 space-y-4 border-t ${themeClasses.cardBorder} transition-all duration-300`}>

            <div className="space-y-6">

              {/* Font Size Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg">
                  <span className={`font-semibold transition-all duration-300 ${themeClasses.primaryText} ${themeClasses.fontLabel}`}>Font Size</span>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', e.target.value as 'small' | 'medium' | 'large')}
                    className={`border ${themeClasses.cardBorder} ${themeClasses.inputBg} ${themeClasses.primaryText} rounded-lg px-3 py-2 font-semibold transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-green-400/50 focus:outline-none ${themeClasses.fontLabel}`}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>

              {/* Divider */}
              <div className={`border-t ${themeClasses.cardBorder} opacity-50`}></div>

              {/* Timestamps Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg">
                  <span className={`font-semibold transition-all duration-300 ${themeClasses.primaryText} ${themeClasses.fontLabel}`}>Show Timestamps</span>
                  <button
                    onClick={() => updateSetting('showTimestamps', !settings.showTimestamps)}
                    className={`w-10 h-5 rounded-full transition-all duration-200 hover:scale-110 ${
                      settings.showTimestamps ? 'bg-green-500 shadow-lg' : 'bg-gray-400'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      settings.showTimestamps ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}