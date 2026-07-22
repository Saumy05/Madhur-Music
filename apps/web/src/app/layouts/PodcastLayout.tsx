import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { Logo } from '@/components/common/Logo';

const PODCAST_NAV_ITEMS = [
  { label: 'Dashboard', path: '/podcast/dashboard', icon: 'dashboard' },
  { label: 'Episodes', path: '/podcast/episodes', icon: 'graphic_eq' },
  { label: 'Upload Episode', path: '/podcast/upload-episode', icon: 'mic_external_on' },
  { label: 'Series', path: '/podcast/series', icon: 'video_library' },
  { label: 'Audience', path: '/podcast/audience', icon: 'groups_3' },
  { label: 'Revenue', path: '/podcast/revenue', icon: 'monetization_on' },
  { label: 'Sponsors', path: '/podcast/sponsors', icon: 'handshake' },
  { label: 'Analytics', path: '/podcast/analytics', icon: 'insights' },
  { label: 'Settings', path: '/podcast/settings', icon: 'settings' },
];

export const PodcastLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSignOut = () => {
    navigate('/podcast/login');
  };

  return (
    <div className="min-h-screen bg-[#050b07] text-emerald-100 flex flex-col font-body antialiased selection:bg-[#059669] dark">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#030604]/80 backdrop-blur-2xl border-b border-emerald-950 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Logo to="/podcast/dashboard" size={32} />
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-emerald-600 text-white">
              Podcast Studio
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-3 pl-3 border-l border-emerald-950">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-white">{user?.name || 'Podcast Host'}</p>
              <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Creator Pro</p>
            </div>
            
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/30 hover:border-emerald-500 transition-colors relative"
            >
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-11 w-56 bg-emerald-950 border border-emerald-900 rounded-2xl p-2.5 shadow-2xl z-50">
                <div className="px-3.5 py-2 border-b border-emerald-900 mb-2">
                  <p className="text-xs font-black text-white leading-none">{user?.name || 'Podcast Host'}</p>
                  <p className="text-[10px] text-emerald-400 mt-1 leading-none truncate">{user?.email || 'host@podcaststudio.com'}</p>
                </div>
                
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors text-left font-bold"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 flex w-full max-w-[1800px] mx-auto">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-emerald-950 p-4 h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto no-scrollbar justify-between">
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
                Podcast Studio
              </p>
              {PODCAST_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-emerald-300 hover:bg-emerald-950/60'
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-4 sm:p-8 overflow-x-hidden min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
