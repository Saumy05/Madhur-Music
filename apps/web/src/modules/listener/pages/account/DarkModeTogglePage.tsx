import React, { useState, useEffect } from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const DarkModeTogglePage: React.FC = () => {
  const [themeMode, setThemeMode] = useState<'LIGHT' | 'DARK' | 'SYSTEM'>(() => {
    if (typeof window === 'undefined') return 'LIGHT';
    const saved = localStorage.getItem('theme-mode');
    return (saved as 'LIGHT' | 'DARK' | 'SYSTEM') || 'LIGHT';
  });

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme-mode', themeMode);

    if (themeMode === 'DARK') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (themeMode === 'LIGHT') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    }
  }, [themeMode]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Theme & Visual Appearance
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40] dark:text-zinc-400">
          Switch between Light Mode, Midnight Dark Mode, or Sync with System.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['LIGHT', 'DARK', 'SYSTEM'] as const).map((mode) => (
          <div
            key={mode}
            onClick={() => setThemeMode(mode)}
            className={`glass-panel p-6 rounded-3xl border cursor-pointer text-center space-y-3 transition-all ${
              themeMode === mode
                ? 'border-[#ba0034] bg-[#ffe9e9]/80 artist-glow'
                : 'border-white/40 dark:border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-4xl text-[#ba0034]">
              {mode === 'LIGHT' ? 'light_mode' : mode === 'DARK' ? 'dark_mode' : 'settings_brightness'}
            </span>
            <h3 className="font-bold text-base text-[#281718] dark:text-white">
              {mode} Theme
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
