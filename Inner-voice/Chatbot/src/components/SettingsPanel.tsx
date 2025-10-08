import React, { useState, useRef, useEffect } from 'react';
import { Settings, LogOut, User } from 'lucide-react';
import { Character } from '../types/Character';
import { useTheme, useThemeClasses } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
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
  const { logout, isAuthenticated, user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use sidebar-specific styles for consistency
  const sidebarStyles = themeClasses.sidebarStyles;

  // Click outside to close (only for non-collapsed mode)
  useEffect(() => {
    if (collapsed || !isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [collapsed, isExpanded]);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = async () => {
    try {
      await logout();
      setShowLogoutDialog(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (collapsed) {
    return (
      <>
        <div className="px-3 py-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={`w-full p-2 ${sidebarStyles.buttonBg} rounded-lg border ${sidebarStyles.border} transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md`}
                title="Settings"
              >
                <Settings className={`w-4 h-4 ${sidebarStyles.textPrimary} mx-auto transition-all duration-200`} />
              </button>
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="w-80">
              <div className="space-y-1">
                {/* Header */}
                <div className="flex items-center gap-2 p-3 rounded-lg">
                  <Settings className={`w-4 h-4 ${sidebarStyles.textPrimary}`} />
                  <span className={`font-semibold ${sidebarStyles.textPrimary} ${sidebarStyles.fontButton}`}>Settings</span>
                </div>

                {/* User Profile Section */}
                {user && (
                  <div className={`p-3 ${sidebarStyles.buttonBg} rounded-lg border ${sidebarStyles.border} mx-3 my-2`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${sidebarStyles.buttonBg} rounded-full flex items-center justify-center border ${sidebarStyles.border}`}>
                        <User className={`w-5 h-5 ${sidebarStyles.textPrimary}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold ${sidebarStyles.textPrimary} ${sidebarStyles.fontCaption} truncate`}>
                          {user.username}
                        </p>
                        <p className={`text-xs ${sidebarStyles.textSecondary} truncate`}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Font Size Section */}
                <div className="p-3 rounded-lg transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${sidebarStyles.textPrimary} ${sidebarStyles.fontCaption}`}>Font Size</span>
                    <select
                      value={settings.fontSize}
                      onChange={(e) => updateSetting('fontSize', e.target.value as 'small' | 'medium' | 'large')}
                      className={`border ${sidebarStyles.border} ${sidebarStyles.panelBg} ${sidebarStyles.textPrimary} rounded px-2 py-1 ${sidebarStyles.fontCaption} font-medium transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md focus:ring-2 focus:ring-green-400/50 focus:outline-none`}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>

                {/* Timestamps Section */}
                <div className="p-3 rounded-lg transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${sidebarStyles.textPrimary} ${sidebarStyles.fontCaption}`}>Show Timestamps</span>
                    <button
                      onClick={() => updateSetting('showTimestamps', !settings.showTimestamps)}
                      className={`w-8 h-4 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md ${
                        settings.showTimestamps ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    >
                      <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform ${
                        settings.showTimestamps ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Logout Section */}
                {isAuthenticated && (
                  <div className="p-3 rounded-lg transition-all duration-200">
                    <button
                      onClick={handleLogoutClick}
                      className={`w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md`}
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span className={`font-medium text-red-500 ${sidebarStyles.fontCaption}`}>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Logout Confirmation Dialog - also needed for collapsed state */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className={`sm:max-w-md ${themeClasses.panelBg} backdrop-blur-xl border ${themeClasses.cardBorder}`}>
            <DialogHeader>
              <DialogTitle className={`${themeClasses.primaryText} ${themeClasses.fontHeading} flex items-center gap-2`}>
                <LogOut className="w-5 h-5 text-red-500" />
                Confirm Logout
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className={`${themeClasses.secondaryText} ${themeClasses.fontBody}`}>
                Are you sure you want to log out? Your current conversation will be saved.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowLogoutDialog(false)}
                  className={`px-4 py-2 ${themeClasses.buttonBg} ${themeClasses.primaryText} rounded-lg border ${themeClasses.cardBorder} hover:scale-[1.02] transition-all duration-200 font-semibold ${themeClasses.fontLabel}`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-[1.02] transition-all duration-200 font-semibold"
                >
                  Log Out
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className="px-4 py-3" ref={containerRef}>
      <div className={`rounded-xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${themeClasses.settingsPanelBg}`}>
        {/* Settings Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between p-3 ${themeClasses.buttonBg} hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md rounded-xl`}
        >
          <div className="flex items-center gap-2">
            <Settings className={`w-4 h-4 ${themeClasses.primaryText} transition-all duration-200`} />
            <span className={`font-character font-bold transition-all duration-200 ${themeClasses.primaryText} ${themeClasses.fontHeading}`}>Settings</span>
          </div>
          <div className={`transform transition-all duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className={`w-4 h-4 ${themeClasses.primaryText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Expanded Settings Content */}
        {isExpanded && (
          <div className={`px-3 pb-3 space-y-3 border-t ${themeClasses.cardBorder} transition-all duration-300`}>

            <div className="space-y-3">

              {/* User Profile Section */}
              {user && (
                <>
                  <div className={`p-2.5 ${themeClasses.buttonBg} rounded-lg border ${themeClasses.cardBorder} mt-3`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${themeClasses.buttonBg} rounded-full flex items-center justify-center border ${themeClasses.cardBorder}`}>
                        <User className={`w-5 h-5 ${themeClasses.primaryText}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold ${themeClasses.primaryText} ${themeClasses.fontLabel} truncate`}>
                          {user.username}
                        </p>
                        <p className={`text-sm ${themeClasses.secondaryText} truncate mt-1`}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`border-t ${themeClasses.cardBorder} opacity-50`}></div>
                </>
              )}

              {/* Font Size Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg">
                  <span className={`font-semibold transition-all duration-200 ${themeClasses.primaryText} ${themeClasses.fontLabel}`}>Font Size</span>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', e.target.value as 'small' | 'medium' | 'large')}
                    className={`border ${themeClasses.cardBorder} ${themeClasses.inputBg} ${themeClasses.primaryText} rounded-lg px-3 py-2 font-semibold transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md focus:ring-2 focus:ring-green-400/50 focus:outline-none ${themeClasses.fontLabel}`}
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
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg">
                  <span className={`font-semibold transition-all duration-200 ${themeClasses.primaryText} ${themeClasses.fontLabel}`}>Show Timestamps</span>
                  <button
                    onClick={() => updateSetting('showTimestamps', !settings.showTimestamps)}
                    className={`w-10 h-5 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md ${
                      settings.showTimestamps ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      settings.showTimestamps ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Logout Section */}
              {isAuthenticated && (
                <>
                  {/* Divider */}
                  <div className={`border-t ${themeClasses.cardBorder} opacity-50`}></div>

                  <div className="space-y-2">
                    <button
                      onClick={handleLogoutClick}
                      className={`w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md`}
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span className={`font-semibold text-red-500 ${themeClasses.fontLabel}`}>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className={`sm:max-w-md ${themeClasses.panelBg} backdrop-blur-xl border ${themeClasses.cardBorder}`}>
          <DialogHeader>
            <DialogTitle className={`${themeClasses.primaryText} ${themeClasses.fontHeading} flex items-center gap-2`}>
              <LogOut className="w-5 h-5 text-red-500" />
              Confirm Logout
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className={`${themeClasses.secondaryText} ${themeClasses.fontBody}`}>
              Are you sure you want to log out? Your current conversation will be saved.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className={`px-4 py-2 ${themeClasses.buttonBg} ${themeClasses.primaryText} rounded-lg border ${themeClasses.cardBorder} hover:scale-[1.02] transition-all duration-200 font-semibold ${themeClasses.fontLabel}`}
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-[1.02] transition-all duration-200 font-semibold"
              >
                Log Out
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}