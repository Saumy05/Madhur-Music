import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { Logo } from '@/components/common/Logo';

const PROMOTER_NAV_ITEMS = [
  { label: 'Dashboard', path: '/promoter/dashboard', icon: 'dashboard' },
  { label: 'Events', path: '/promoter/events', icon: 'event_seat' },
  { label: 'Venues', path: '/promoter/venues', icon: 'location_city' },
  { label: 'Tickets', path: '/promoter/tickets', icon: 'confirmation_number' },
  { label: 'Campaigns', path: '/promoter/campaigns', icon: 'campaign' },
  { label: 'Settings', path: '/promoter/settings', icon: 'settings' },
];

export const PromoterLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSignOut = () => {
    navigate('/promoter/login');
  };

  return (
    <div className="min-h-screen bg-[#0f0a05] text-amber-100 flex flex-col font-body antialiased selection:bg-[#d97706] dark">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#090603]/80 backdrop-blur-2xl border-b border-amber-950 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Logo to="/promoter/dashboard" size={32} />
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-amber-600 text-white">
              Madhur Events
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-3 pl-3 border-l border-amber-950">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-white">{user?.name || 'Promoter'}</p>
              <p className="text-[8px] font-black text-amber-400 uppercase tracking-widest">Organizer Pro</p>
            </div>
            
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-9 h-9 rounded-xl overflow-hidden border border-amber-500/30 hover:border-amber-500 transition-colors relative"
            >
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-11 w-56 bg-amber-950 border border-amber-900 rounded-2xl p-2.5 shadow-2xl z-50">
                <div className="px-3.5 py-2 border-b border-amber-900 mb-2">
                  <p className="text-xs font-black text-white leading-none">{user?.name || 'Promoter'}</p>
                  <p className="text-[10px] text-amber-455 mt-1 leading-none truncate">{user?.email || 'promoter@madhurevents.com'}</p>
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
        <aside className="hidden lg:flex flex-col w-64 border-r border-amber-950 p-4 h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto no-scrollbar justify-between">
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-2">
                Promoter Console
              </p>
              {PROMOTER_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'text-amber-300 hover:bg-amber-955/60'
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
