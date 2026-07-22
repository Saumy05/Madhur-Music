import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { NavigationDrawer } from './NavigationDrawer';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const LISTENER_NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/listener', icon: 'home' },
  { label: 'Explore', path: '/listener/explore', icon: 'explore' },
  { label: 'Library', path: '/listener/library', icon: 'library_music' },
  { label: 'Podcasts', path: '/listener/podcasts', icon: 'podcasts' },
  { label: 'Concerts', path: '/listener/concerts', icon: 'confirmation_number' },
  { label: 'Submit a Song', path: '/listener/submit-song', icon: 'upload' },
  { label: 'Downloads', path: '/listener/downloads', icon: 'download_for_offline' },
  { label: 'Backstage VIP', path: '/listener/backstage', icon: 'workspace_premium' },
  { label: 'Profile', path: '/listener/user-profile', icon: 'person' },
  { label: 'Settings', path: '/listener/settings', icon: 'settings' },
];

export const SidebarNav: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 glass-panel border-r border-white/40 dark:border-white/10 p-4 h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto no-scrollbar justify-between">
        <div className="space-y-5">
          {/* Static Listener Navigation */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase tracking-widest mb-2">
              Listener Navigation
            </p>
            {LISTENER_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/listener'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'premium-gradient text-white shadow-md'
                      : 'text-[#281718] dark:text-zinc-300 hover:bg-[#ffe9e9] dark:hover:bg-white/10'
                  }`
                }
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* All Pages Catalog Trigger */}
        <div className="pt-4 border-t border-[#e6bcbd]/40 dark:border-white/10 space-y-2">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="w-full py-2.5 px-3 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] dark:text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">grid_view</span>
            <span>All Pages Directory (100+)</span>
          </button>
        </div>
      </aside>

      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};
