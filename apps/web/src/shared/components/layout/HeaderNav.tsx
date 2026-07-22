import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { usePlayerStore } from '@/shared/player/usePlayerStore';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { NavigationDrawer } from './NavigationDrawer';

interface HeaderNavProps {
  onSearchClick?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onSearchClick }) => {
  const navigate = useNavigate();
  const { audioMode, setAudioMode } = usePlayerStore();
  const { user, logout } = useAuthStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const profilePath = '/listener/user-profile';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/40 dark:border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand & Search */}
        <div className="flex items-center gap-3.5">
          <Logo to={user ? '/listener' : '/'} size={36} />

          {/* Site-wide Page Navigator Trigger Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffe9e9] dark:bg-white/10 text-xs font-bold text-[#ba0034] hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">grid_view</span>
            <span className="hidden sm:inline">All Pages</span>
          </button>

          {/* Global Search Input */}
          <div
            onClick={() => {
              if (onSearchClick) onSearchClick();
              else navigate('/listener/search');
            }}
            className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#ffe9e9] dark:bg-white/10 text-xs text-[#5d3f40] dark:text-zinc-300 w-56 lg:w-72 cursor-pointer hover:bg-[#ffe1e1] transition-colors"
          >
            <span className="material-symbols-outlined text-lg text-[#ba0034]">
              search
            </span>
            <span className="truncate">Search tracks, artists...</span>
          </div>
        </div>

        {/* Center Audio Mode Selector */}
        <div className="hidden lg:flex items-center gap-1 bg-[#ffe9e9] dark:bg-white/10 p-1 rounded-full text-xs font-semibold">
          {(['STANDARD', 'DJ_MODE', 'FOCUS_MODE', 'HI_RES_SPATIAL'] as const).map(
            (mode) => (
              <button
                key={mode}
                onClick={() => setAudioMode(mode)}
                className={`px-3 py-1 rounded-full transition-all text-[11px] font-bold cursor-pointer ${
                  audioMode === mode
                    ? 'premium-gradient text-white shadow-sm'
                    : 'text-[#5d3f40] dark:text-zinc-300 hover:text-[#ba0034]'
                }`}
              >
                {mode.replace('_', ' ')}
              </button>
            )
          )}
        </div>

        {/* Right User Actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <button
            onClick={() => navigate('/listener/notifications')}
            className="p-2 rounded-full hover:bg-[#ffe9e9] dark:hover:bg-white/10 text-[#281718] dark:text-white transition-colors relative cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ba0034] animate-ping" />
          </button>

          <button
            onClick={() => navigate('/listener/pricing')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold premium-gradient text-white glow-button cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            <span>Backstage VIP</span>
          </button>

          {/* User Profile Avatar */}
          <Link
            to={profilePath}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#ba0034]/30 hover:border-[#ba0034] transition-colors flex-shrink-0"
            title="User Profile"
          >
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-red-500/10 text-red-500 dark:text-red-400 transition-colors cursor-pointer"
            title="Sign Out / Logout"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
          </button>
        </div>
      </header>

      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

