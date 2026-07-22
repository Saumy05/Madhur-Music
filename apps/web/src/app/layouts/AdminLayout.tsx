import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { useAdminAuthStore } from '@/modules/admin/auth/useAdminAuthStore';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { countUnreadNotifications } from '@/data/songsApi';

const BASE_ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
  { label: 'Users', path: '/admin/users', icon: 'manage_accounts' },
  { label: 'Songs', path: '/admin/songs', icon: 'music_note', badge: true },
  { label: 'Artists', path: '/admin/artists', icon: 'person_stars' },
  { label: 'Labels', path: '/admin/labels', icon: 'domain' },
  { label: 'Subscriptions', path: '/admin/subscriptions', icon: 'subscriptions' },
  { label: 'Revenue', path: '/admin/revenue', icon: 'account_balance_wallet' },
  { label: 'Analytics', path: '/admin/analytics', icon: 'query_stats' },
  { label: 'Roles', path: '/admin/roles', icon: 'admin_panel_settings' },
  { label: 'Permissions', path: '/admin/permissions', icon: 'vpn_key' },
  { label: 'System Settings', path: '/admin/system-settings', icon: 'tune' },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: 'history' },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { token } = useAdminAuthStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Poll unread notification count every 30 seconds — only when JWT is present
  useEffect(() => {
    if (!token) return; // No token → skip polling, badge stays at 0
    const load = async () => {
      try {
        const result = await countUnreadNotifications(token);
        setPendingCount(result.count);
      } catch { /* 401 / network errors are silently ignored */ }
    };
    load();
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  }, [token]);

  const handleSignOut = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#07090e] dark:text-slate-200 flex flex-col font-body antialiased selection:bg-[#1e293b] transition-colors duration-200">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white/85 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between font-mono">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Logo to="/admin/dashboard" size={32} />
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-[9px] font-black bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-white">
              [Console Admin]
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="relative flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-900 dark:text-white">{user?.name || 'Administrator'}</p>
              <p className="text-[8px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest">[Sys Root]</p>
            </div>

            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-500/30 hover:border-slate-400 dark:hover:border-zinc-500 transition-colors relative"
            >
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-11 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 shadow-2xl z-50 text-slate-900 dark:text-white">
                <div className="px-3.5 py-2 border-b border-slate-200 dark:border-slate-800 mb-2">
                  <p className="text-xs font-black text-slate-900 dark:text-white leading-none">{user?.name || 'Administrator'}</p>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1 leading-none truncate">{user?.email || 'root@madhur.com'}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-500 dark:text-red-400 hover:bg-red-500/10 transition-colors text-left font-bold"
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
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 p-4 h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto no-scrollbar justify-between font-mono">
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest mb-2">
                Console Command
              </p>
              {BASE_ADMIN_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-200 text-slate-900 border border-slate-300 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  <span className="truncate flex-1">{item.label}</span>
                  {/* Notification badge on Songs */}
                  {item.badge && pendingCount > 0 && (
                    <span className="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center">
                      {pendingCount > 99 ? '99+' : pendingCount}
                    </span>
                  )}
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
