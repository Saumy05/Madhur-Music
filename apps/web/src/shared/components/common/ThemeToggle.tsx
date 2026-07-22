import React, { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme-mode');
    if (saved) return saved === 'DARK';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme-mode', 'DARK');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('theme-mode', 'LIGHT');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full hover:bg-[#ffe9e9]/50 dark:hover:bg-white/10 text-[#281718] dark:text-white transition-colors cursor-pointer flex items-center justify-center"
      title="Toggle Light/Dark Theme"
    >
      <span className="material-symbols-outlined text-xl">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};
