import React from 'react';
import { useNavigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';
import { useAuthStore } from '@/shared/auth/useAuthStore';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Settings & Account
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Manage playback streaming quality, audio devices, and Backstage membership.
        </p>
      </div>

      {/* Audio Streaming Quality */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-6">
        <h3 className="font-bold text-lg text-[#281718] dark:text-white">
          Audio Streaming Quality
        </h3>
        <div className="space-y-3">
          {[
            { title: 'Spatial Audio 24-bit 192kHz (FLAC Lossless)', badge: 'Best Quality' },
            { title: 'High Quality 320kbps (AAC)', badge: 'Recommended' },
            { title: 'Data Saver 96kbps', badge: 'Low Data' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 cursor-pointer hover:bg-[#ffe9e9]"
            >
              <div>
                <p className="text-xs font-bold text-[#281718] dark:text-white">
                  {item.title}
                </p>
                <span className="text-[10px] text-[#ba0034] font-semibold">
                  {item.badge}
                </span>
              </div>
              <input
                type="radio"
                name="quality"
                defaultChecked={idx === 0}
                className="accent-[#ba0034]"
              />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#e6bcbd]/40 flex flex-wrap gap-3">
          <PillButton variant="primary" onClick={() => navigate('/devices')}>
            Manage Connected Devices
          </PillButton>
          <PillButton variant="secondary" onClick={() => navigate('/equalizer-presets')}>
            Equalizer Hardware Presets
          </PillButton>
        </div>
      </div>

      {/* Quick Settings Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          onClick={() => navigate('/user-profile')}
          className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              account_circle
            </span>
            <span className="font-bold text-sm text-[#281718] dark:text-white">
              User Profile & Bio
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-[#5d3f40]">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => navigate('/devices')}
          className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              devices
            </span>
            <span className="font-bold text-sm text-[#281718] dark:text-white">
              Connect Devices
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-[#5d3f40]">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => navigate('/family-sharing')}
          className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              family_history
            </span>
            <span className="font-bold text-sm text-[#281718] dark:text-white">
              Family Sharing
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-[#5d3f40]">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => navigate('/dark-mode-settings')}
          className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              dark_mode
            </span>
            <span className="font-bold text-sm text-[#281718] dark:text-white">
              Appearance & Theme
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-[#5d3f40]">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => navigate('/offline-vault')}
          className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              lock
            </span>
            <span className="font-bold text-sm text-[#281718] dark:text-white">
              Encrypted Vault
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-[#5d3f40]">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => navigate('/audio-cache')}
          className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              memory
            </span>
            <span className="font-bold text-sm text-[#281718] dark:text-white">
              Storage & Cache
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-[#5d3f40]">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="glass-panel p-5 rounded-2xl border border-red-500/20 hover:border-red-500/50 cursor-pointer bg-red-500/5 hover:bg-red-500/10 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-red-500">
              logout
            </span>
            <span className="font-bold text-sm text-red-600 dark:text-red-400">
              Sign Out Session
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

