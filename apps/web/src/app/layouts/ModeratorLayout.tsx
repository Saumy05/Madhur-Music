import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { Logo } from '@/components/common/Logo';

const MODERATOR_NAV_ITEMS = [
  { label: 'Dashboard', path: '/moderator/dashboard', icon: 'dashboard' },
  { label: 'Reported Songs', path: '/moderator/reported-songs', icon: 'report_problem' },
  { label: 'Reported Podcasts', path: '/moderator/reported-podcasts', icon: 'podcasts' },
  { label: 'Copyright Claims', path: '/moderator/copyright-claims', icon: 'copyright' },
  { label: 'Artist Verification', path: '/moderator/artist-verification', icon: 'verified_user' },
  { label: 'Settings', path: '/moderator/settings', icon: 'settings' },
];

export const ModeratorLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSignOut = () => {
    navigate('/moderator/login');
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-100 flex flex-col font-body antialiased selection:bg-[#475569] dark">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#090b0e]/80 backdrop-blur-2xl border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Logo to="/moderator/dashboard" size={32} />
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-slate-700 text-white">
              Trust & Safety
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-white">{user?.name || 'Moderator Agent'}</p>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Moderator staff</p>
            </div>
            
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-9 h-9 rounded-xl overflow-hidden border border-slate-500/30 hover:border-slate-500 transition-colors relative"
            >
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-11 w-56 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-2xl z-50">
                <div className="px-3.5 py-2 border-b border-slate-800 mb-2">
                  <p className="text-xs font-black text-white leading-none">{user?.name || 'Moderator Agent'}</p>
                  <p className="text-[10px] text-slate-400 mt-1 leading-none truncate">{user?.email || 'agent@madhursafety.com'}</p>
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
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 p-4 h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto no-scrollbar justify-between">
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Safety Portal
              </p>
              {MODERATOR_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-700 text-white shadow-md'
                        : 'text-slate-300 hover:bg-slate-800'
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
