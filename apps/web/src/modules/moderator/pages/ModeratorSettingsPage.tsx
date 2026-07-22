import React from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';

export const ModeratorSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-white">
          Trust & Safety Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Manage explicit content filter parameters, automated claim thresholds, and verification queue priorities.
        </p>
      </div>

      {/* Flag Limits */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <h3 className="font-bold text-lg text-white">
          Automated Moderator Policies
        </h3>
        <div className="space-y-3">
          {[
            { title: 'Auto-Mute Flagged Tracks', desc: 'Instantly mute tracks that accumulate more than 10 report claims' },
            { title: 'Priority verification', desc: 'Place label-backed artists at the top of verification review' },
            { title: 'Explicit Lyrics Filter', desc: 'Scan uploaded lyrics sheets automatically' },
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
                defaultChecked={idx === 2}
                className="w-4 h-4 text-red-600 bg-zinc-700 border-zinc-600 rounded focus:ring-red-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => navigate('/moderator/reported-songs')}
          className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              report_problem
            </span>
            <span className="font-bold text-sm text-white">
              Reported Catalog Queue
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-zinc-400">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => {
            logout();
            navigate('/moderator/login');
          }}
          className="glass-panel p-5 rounded-2xl border border-red-500/20 hover:border-red-500/50 cursor-pointer bg-red-500/5 hover:bg-red-500/10 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-red-500">
              logout
            </span>
            <span className="font-bold text-sm text-red-400">
              Sign Out Moderator Session
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
