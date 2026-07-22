import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const AdminArtistsLabelsPage: React.FC = () => {
  const labels = [
    { name: 'Apex Music Group', catalogSize: '4,200 Tracks', artistsCount: 24, status: 'Verified Enterprise' },
    { name: 'Echo Recordings', catalogSize: '1,850 Tracks', artistsCount: 12, status: 'Verified Standard' },
    { name: 'CyberPulse Underground', catalogSize: '620 Tracks', artistsCount: 5, status: 'Pending Audit' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Artist & Music Label Registry
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Global catalog distribution oversight, DDEX endpoints, master licensing compliance & label accounts.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">domain_add</span>
          <span>Register Record Label</span>
        </PillButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {labels.map((l) => (
          <div key={l.name} className="glass-panel p-6 rounded-3xl border border-white/40 space-y-3">
            <span className="text-[10px] font-bold text-[#ba0034] uppercase tracking-wider">{l.status}</span>
            <h3 className="font-extrabold text-base text-[#281718] dark:text-white">{l.name}</h3>
            <p className="text-xs text-[#5d3f40] dark:text-zinc-400">Catalog Size: {l.catalogSize} | Signed Artists: {l.artistsCount}</p>

            <button className="w-full py-2 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] font-bold text-xs hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer">
              Label Audit & DDEX Feeds
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
