import React from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';

export const LabelSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-white">
          Label Hub Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Manage contract templates, default roster royalty splits, publishing outputs, and catalog controls.
        </p>
      </div>

      {/* Contract Templates */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <h3 className="font-bold text-lg text-white">
          Roster Split Templates
        </h3>
        <div className="space-y-3">
          {[
            { title: 'Standard 50/50 Label-Artist Split', desc: 'Default splits template applied to new artist additions' },
            { title: 'Catalog Acquisition Model', desc: '100% Label royalty splits for purchased catalogs' },
            { title: 'Custom Variable Royalties', desc: 'Assign royalty schedules per track basis' },
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
                name="split"
                defaultChecked={idx === 0}
                className="accent-[#ba0034]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => navigate('/label/artists')}
          className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              recent_actors
            </span>
            <span className="font-bold text-sm text-white">
              Roster & Artist Profiles
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-zinc-400">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => navigate('/label/contracts')}
          className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              description
            </span>
            <span className="font-bold text-sm text-white">
              Contracts & Legal Archive
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-zinc-400">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => {
            logout();
            navigate('/label/login');
          }}
          className="glass-panel p-5 rounded-2xl border border-red-500/20 hover:border-red-500/50 cursor-pointer bg-red-500/5 hover:bg-red-500/10 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-red-500">
              logout
            </span>
            <span className="font-bold text-sm text-red-400">
              Sign Out Label Session
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
