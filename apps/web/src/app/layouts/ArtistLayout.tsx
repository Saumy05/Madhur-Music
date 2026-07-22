import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { Logo } from '@/components/common/Logo';

// 16 Required Left Sidebar Items
const STUDIO_NAV_ITEMS = [
  { label: 'Studio', path: '/creator-studio', icon: 'token' },
  { label: 'Dashboard', path: '/artist/dashboard', icon: 'dashboard' },
  { label: 'Upload', path: '/artist/upload', icon: 'cloud_upload' },
  { label: 'Music', path: '/artist/music', icon: 'music_note' },
  { label: 'Albums', path: '/artist/albums', icon: 'album' },
  { label: 'Singles', path: '/artist/singles', icon: 'audiotrack' },
  { label: 'Analytics', path: '/artist/analytics', icon: 'monitoring' },
  { label: 'Audience', path: '/artist/audience', icon: 'groups' },
  { label: 'Revenue', path: '/artist/revenue', icon: 'payments' },
  { label: 'Royalties', path: '/artist/royalties', icon: 'account_balance' },
  { label: 'Marketing', path: '/artist/marketing', icon: 'campaign' },
  { label: 'Fan Club', path: '/artist/fan-club', icon: 'diversity_3' },
  { label: 'Collaborators', path: '/artist/collaborators', icon: 'group_add' },
  { label: 'Comments', path: '/artist/comments', icon: 'forum' },
  { label: 'Verification', path: '/artist/verification', icon: 'verified' },
  { label: 'Settings', path: '/artist/settings', icon: 'settings' },
];

export const ArtistLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, setRole } = useAuthStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = () => {
    navigate('/login');
  };

  const mockNotifications = [
    { id: 1, text: 'Cosmic Drift EP got 50k new streams today!', time: '10m ago', icon: 'trending_up', color: 'text-emerald-500' },
    { id: 2, text: 'Royalty payout of $4,820 was initiated.', time: '2h ago', icon: 'payments', color: 'text-purple-500' },
    { id: 3, text: 'Collaborator request received from Dj Zedd.', time: '1d ago', icon: 'person_add', color: 'text-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-[#0d0708] text-zinc-100 flex flex-col font-body antialiased selection:bg-[#ba0034] selection:text-white dark">
      
      {/* 1. ARTIST STUDIO HEADER */}
      <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-2xl border-b border-white/5 px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Brand Studio Name & Search */}
        <div className="flex items-center gap-6 flex-1 max-w-xl">
          <div className="flex items-center gap-3">
            <Logo to="/artist/dashboard" size={32} />
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-gradient-to-r from-[#ba0034] to-[#8d2ebc] text-white">
              Studio
            </span>
          </div>
          
          {/* Quick Search */}
          <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 text-xs text-zinc-400 w-80 border border-white/5 focus-within:border-[#ba0034]/50 transition-all">
            <span className="material-symbols-outlined text-lg text-[#ba0034]">search</span>
            <input
              type="text"
              placeholder="Search catalog, stems, releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-zinc-200 placeholder-zinc-500 text-xs"
            />
          </div>
        </div>

        {/* Action Controls & Profile Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Navigation Action Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => navigate('/artist/upload')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#ba0034] text-xs font-bold text-zinc-200 hover:text-white transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">cloud_upload</span>
              <span>Upload</span>
            </button>
            
            <button
              onClick={() => navigate('/artist/albums')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#ba0034] text-xs font-bold text-zinc-200 hover:text-white transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">album</span>
              <span>Create Release</span>
            </button>

            <button
              onClick={() => navigate('/creator-studio')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-[#ba0034] text-white hover:bg-[#a0002b] transition-all shadow-lg shadow-[#ba0034]/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">sensors</span>
              <span>Go Live</span>
            </button>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileDropdownOpen(false); }}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 relative transition-all"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#120b0c] border border-white/10 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                  <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Studio Alerts</h4>
                  <span className="text-[10px] text-red-500 font-bold hover:underline cursor-pointer">Mark all read</span>
                </div>
                <div className="space-y-3">
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className="flex gap-2.5 text-xs text-zinc-300 hover:bg-white/5 p-2 rounded-xl transition-colors">
                      <span className={`material-symbols-outlined text-lg ${notif.color} shrink-0`}>{notif.icon}</span>
                      <div>
                        <p className="font-semibold leading-snug">{notif.text}</p>
                        <span className="text-[9px] text-zinc-500 block mt-1">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User profile details & Avatar dropdown */}
          <div className="relative flex items-center gap-3 pl-3 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <div className="flex items-center gap-1">
                <p className="text-xs font-black text-white">{user?.name || 'Saumya Tiwari'}</p>
                <span className="material-symbols-outlined text-xs text-blue-400 font-bold fill-current">verified</span>
              </div>
              <p className="text-[8px] font-black text-red-500 uppercase tracking-widest">Artist Pro</p>
            </div>
            
            <button
              onClick={() => { setProfileDropdownOpen(!profileDropdownOpen); setNotificationsOpen(false); }}
              className="w-9 h-9 rounded-xl overflow-hidden border border-[#ba0034]/30 hover:border-[#ba0034] transition-colors relative"
            >
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                alt="Artist avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-11 w-56 bg-[#120b0c] border border-white/10 rounded-2xl p-2.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3.5 py-2 border-b border-white/5 mb-2">
                  <p className="text-xs font-black text-white leading-none">{user?.name || 'Saumya Tiwari'}</p>
                  <p className="text-[10px] text-zinc-400 mt-1 leading-none truncate">{user?.email || 'saumya@example.com'}</p>
                </div>
                
                <Link
                  to="/artist/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-[#ba0034]">person</span>
                  <span>Artist Profile</span>
                </Link>

                <Link
                  to="/artist/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-[#ba0034]">settings</span>
                  <span>Settings</span>
                </Link>

                <div className="h-px bg-white/5 my-2" />

                <button
                  onClick={() => {
                    setRole('USER');
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-base text-purple-400">headphones</span>
                  <span>Exit Studio (Listener)</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors text-left font-bold"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span>Sign Out Session</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </header>

      {/* STUDIO WORKSPACE WRAPPER */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. ARTIST NAVIGATION LEFT SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-64 bg-black/40 border-r border-white/5 p-4 justify-between h-[calc(100vh-105px)] overflow-y-auto no-scrollbar">
          <div className="space-y-5">
            <p className="px-3.5 text-[8px] font-black text-red-500 uppercase tracking-widest">
              Artist Command Center
            </p>

            <nav className="space-y-0.5">
              {STUDIO_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[11px] font-extrabold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#ba0034] to-[#8d2ebc] text-white shadow-lg shadow-[#ba0034]/10'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer Details */}
          <div className="pt-4 border-t border-white/5 text-[9px] text-zinc-500 space-y-1 font-semibold">
            <p>Madhur Studio Platform v2.4.0</p>
            <p className="text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>All node services nominal</span>
            </p>
          </div>
        </aside>

        {/* 3. CORE WORKSPACE CONTENT PANEL */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gradient-to-b from-[#10090a] to-[#080405] text-zinc-100 h-[calc(100vh-105px)] no-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

      {/* 4. BOTTOM PRODUCER STATUS BAR (NO CONSUMER PLAYER) */}
      <footer className="h-11 bg-black/80 backdrop-blur-xl border-t border-white/5 px-4 sm:px-6 flex items-center justify-between text-[10px] text-zinc-400 z-50 select-none">
        
        {/* Background Sync */}
        <div className="flex items-center gap-2 select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold text-zinc-300 uppercase tracking-widest text-[9px]">Live Sync</span>
          <span className="hidden sm:inline-block text-zinc-500">• Connected to AudioNode-West</span>
        </div>

        {/* Upload Queue Progress */}
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-base text-[#ba0034] animate-bounce">cloud_upload</span>
          <span className="font-semibold text-zinc-300">Cosmic Drift EP:</span>
          <div className="w-24 sm:w-32 bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#ba0034] to-[#8d2ebc]" style={{ width: '65%' }} />
          </div>
          <span className="text-zinc-400 font-extrabold">65% (3 of 4 files)</span>
        </div>

        {/* Publishing Status */}
        <div className="hidden md:flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-purple-400">cell_tower</span>
          <span className="text-zinc-500">Publishing:</span>
          <span className="text-zinc-300 font-semibold truncate max-w-xs">Distributing to 12 outlets (Spotify, Apple...)</span>
        </div>

        {/* Audio Processing Stem Status */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-blue-400">instant_mix</span>
          <span className="text-zinc-500">Audio Processing:</span>
          <span className="text-zinc-300 font-semibold">1 Vocal Stem Isolated</span>
        </div>

      </footer>

    </div>
  );
};

