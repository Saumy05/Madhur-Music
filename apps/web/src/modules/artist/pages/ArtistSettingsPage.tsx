import React from 'react';
import { useNavigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';
import { useAuthStore } from '@/shared/auth/useAuthStore';

export const ArtistSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-white">
          Artist Studio Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Manage your artist bio, track release preferences, payout configurations, and streaming splits.
        </p>
      </div>

      {/* Payout Preferences */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <h3 className="font-bold text-lg text-white">
          Direct Payouts & Royalty Splits
        </h3>
        <div className="space-y-3">
          {[
            { title: 'Weekly Bank Transfer (Direct Deposit)', desc: 'No processing fee, paid every Friday' },
            { title: 'SplitSheet Automations', desc: 'Auto-distribute co-producer percentages' },
            { title: 'Hold Revenue', desc: 'Temporarily accumulate funds for label reviews' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/10"
            >
              <div>
                <p className="text-xs font-bold text-white">
                  {item.title}
                </p>
                <span className="text-[10px] text-red-500 font-semibold">
                  {item.desc}
                </span>
              </div>
              <input
                type="radio"
                name="payout"
                defaultChecked={idx === 0}
                className="accent-[#ba0034]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Profile & Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => navigate('/artist/profile')}
          className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              person_stars
            </span>
            <span className="font-bold text-sm text-white">
              Edit Stage Profile & Bio
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-zinc-400">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => navigate('/artist/music')}
          className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              inventory_2
            </span>
            <span className="font-bold text-sm text-white">
              Release Catalog Controls
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-zinc-400">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => navigate('/artist/verification')}
          className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              verified
            </span>
            <span className="font-bold text-sm text-white">
              Studio Verification Badges
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-zinc-400">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => {
            logout();
            navigate('/artist/login');
          }}
          className="glass-panel p-5 rounded-2xl border border-red-500/20 hover:border-red-500/50 cursor-pointer bg-red-500/5 hover:bg-red-500/10 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-red-500">
              logout
            </span>
            <span className="font-bold text-sm text-red-400">
              Sign Out Studio Session
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-red-500">
            chevron_right
          </span>
        </div>
      </div>
    </div>
  );
};
