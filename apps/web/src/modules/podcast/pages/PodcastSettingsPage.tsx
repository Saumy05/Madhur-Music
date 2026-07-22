import React from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';

export const PodcastSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-white">
          Podcast Studio Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Manage your show profiles, RSS distribution feeds, ad models, and auto-transcriptions.
        </p>
      </div>

      {/* RSS Distribution Feed */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <h3 className="font-bold text-lg text-white">
          Distribution Channels & RSS Sync
        </h3>
        <div className="space-y-3">
          {[
            { title: 'Global RSS Distribution Feed', desc: 'Sync to Apple Podcasts, Spotify, and Google Podcasts' },
            { title: 'Auto-Transcription Engine', desc: 'Auto-convert episode audio to readable transcript logs' },
            { title: 'Dynamic Ad Insertion (DAI)', desc: 'Configure sponsorships at defined audio cue points' },
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
                type="checkbox"
                defaultChecked={idx !== 2}
                className="w-4 h-4 text-red-600 bg-zinc-700 border-zinc-600 rounded focus:ring-red-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => navigate('/podcast/episodes')}
          className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              podcasts
            </span>
            <span className="font-bold text-sm text-white">
              Episode Catalog Controls
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-zinc-400">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => navigate('/podcast/sponsors')}
          className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              handshake
            </span>
            <span className="font-bold text-sm text-white">
              Sponsor Sponsorships Hub
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-zinc-400">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => {
            logout();
            navigate('/podcast/login');
          }}
          className="glass-panel p-5 rounded-2xl border border-red-500/20 hover:border-red-500/50 cursor-pointer bg-red-500/5 hover:bg-red-500/10 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-red-500">
              logout
            </span>
            <span className="font-bold text-sm text-red-400">
              Exit Host Studio
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
