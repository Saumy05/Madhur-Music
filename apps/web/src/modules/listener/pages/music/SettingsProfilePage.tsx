import React from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { PillButton } from '@/components/ui/PillButton';

export const SettingsProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          Account Settings
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
          Settings & Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40] dark:text-zinc-400">
          Manage your Madhur profile, active subscription plan, and security settings.
        </p>
      </div>

      {/* User Profile Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 flex flex-col sm:flex-row items-center justify-between gap-6 artist-glow">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
            alt="User avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-[#ba0034]/30 shadow-xl flex-shrink-0"
          />
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ba0034] bg-[#ffe9e9] px-2.5 py-0.5 rounded-full">
              {user?.role || 'LISTENER'}
            </span>
            <h2 className="font-extrabold text-2xl text-[#281718] dark:text-white">
              {user?.name || 'Madhur Listener'}
            </h2>
            <p className="text-xs font-mono text-[#5d3f40] dark:text-zinc-400">
              {user?.email || 'listener@example.com'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PillButton
            variant="outline"
            onClick={() => navigate('/listener/user-profile')}
            className="text-xs"
          >
            View Public Profile
          </PillButton>
        </div>
      </div>

      {/* Subscription Tier */}
      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-[#281718] dark:text-white">
              Current Membership Plan
            </h3>
            <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
              {user?.subscriptionPlan || 'BACKSTAGE_VIP'} Pass
            </p>
          </div>
          <PillButton
            variant="primary"
            glow
            onClick={() => navigate('/listener/pricing')}
            className="text-xs"
          >
            Manage Subscription
          </PillButton>
        </div>
      </div>

      {/* Account Security & Log Out */}
      <div className="glass-panel p-6 rounded-3xl border border-red-500/20 bg-red-500/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-red-600 dark:text-red-400">
              Session Management
            </h3>
            <p className="text-xs text-zinc-500">
              Sign out of your account on this device and clear local session state.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
