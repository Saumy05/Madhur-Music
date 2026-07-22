import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { useAuthStore, UserRole } from '@/shared/auth/useAuthStore';
import { NavigationDrawer } from './NavigationDrawer';

interface BottomNavItem {
  label: string;
  path: string;
  icon: string;
}

const ROLE_BOTTOM_NAV: Record<UserRole, BottomNavItem[]> = {
  USER: [
    { label: 'Home', path: '/listener', icon: 'home' },
    { label: 'Explore', path: '/listener/explore', icon: 'explore' },
    { label: 'Library', path: '/listener/library', icon: 'library_music' },
    { label: 'Podcasts', path: '/listener/podcasts', icon: 'podcasts' },
  ],
  LISTENER: [
    { label: 'Home', path: '/listener', icon: 'home' },
    { label: 'Explore', path: '/listener/explore', icon: 'explore' },
    { label: 'Library', path: '/listener/library', icon: 'library_music' },
    { label: 'Podcasts', path: '/listener/podcasts', icon: 'podcasts' },
  ],
  ARTIST: [
    { label: 'Dashboard', path: '/artist/dashboard', icon: 'dashboard' },
    { label: 'Upload', path: '/artist/upload', icon: 'cloud_upload' },
    { label: 'Analytics', path: '/artist/analytics', icon: 'analytics' },
    { label: 'Followers', path: '/artist/followers', icon: 'group' },
  ],
  MUSIC_LABEL: [
    { label: 'Dashboard', path: '/label/dashboard', icon: 'dashboard' },
    { label: 'Artists', path: '/label/artists', icon: 'recent_actors' },
    { label: 'Catalog', path: '/label/catalog', icon: 'inventory_2' },
    { label: 'Royalties', path: '/label/royalties', icon: 'request_quote' },
  ],
  PODCAST_HOST: [
    { label: 'Dashboard', path: '/podcast/dashboard', icon: 'dashboard' },
    { label: 'Episodes', path: '/podcast/episodes', icon: 'graphic_eq' },
    { label: 'Upload Ep', path: '/podcast/upload-episode', icon: 'mic_external_on' },
    { label: 'Audience', path: '/podcast/audience', icon: 'groups_3' },
  ],
  EVENT_PROMOTER: [
    { label: 'Dashboard', path: '/promoter/dashboard', icon: 'dashboard' },
    { label: 'Events', path: '/promoter/events', icon: 'event_seat' },
    { label: 'Tickets', path: '/promoter/tickets', icon: 'confirmation_number' },
    { label: 'Sales', path: '/promoter/sales', icon: 'trending_up' },
  ],
  MODERATOR: [
    { label: 'Dashboard', path: '/moderator/dashboard', icon: 'dashboard' },
    { label: 'Reported', path: '/moderator/reported-songs', icon: 'report_problem' },
    { label: 'Verify', path: '/moderator/artist-verification', icon: 'verified_user' },
    { label: 'Flags', path: '/moderator/user-reports', icon: 'flag' },
  ],
  ADMIN: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Users', path: '/admin/users', icon: 'manage_accounts' },
    { label: 'Subscriptions', path: '/admin/subscriptions', icon: 'subscriptions' },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: 'history' },
  ],
  ADMINISTRATOR: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Users', path: '/admin/users', icon: 'manage_accounts' },
    { label: 'Subscriptions', path: '/admin/subscriptions', icon: 'subscriptions' },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: 'history' },
  ],
};

export const BottomNav: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuthStore();
  const currentRole = user?.role || 'USER';
  const navItems = ROLE_BOTTOM_NAV[currentRole] || ROLE_BOTTOM_NAV.USER;

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/40 dark:border-white/10 px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/listener'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-2 rounded-2xl transition-all max-w-[64px] ${
                isActive
                  ? 'text-[#ba0034] font-bold dark:text-white'
                  : 'text-[#5d3f40] dark:text-zinc-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`material-symbols-outlined text-xl ${
                    isActive ? 'scale-110' : ''
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-[9px] font-semibold tracking-tight truncate w-full text-center">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}

        {/* All Pages Trigger */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-2xl text-[#ba0034] font-bold cursor-pointer max-w-[64px]"
        >
          <span className="material-symbols-outlined text-xl">grid_view</span>
          <span className="text-[9px] tracking-tight text-center">All Pages</span>
        </button>
      </nav>

      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

