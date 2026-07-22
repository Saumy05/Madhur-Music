import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const ArtistSinglesAlbumsPage: React.FC = () => {
  const releases = [
    { title: 'Velvet Horizon', type: 'Studio Album', date: '2026-03-15', streams: '12.4M', status: 'Published' },
    { title: 'Midnight Serenade', type: 'Single', date: '2026-05-02', streams: '5.6M', status: 'Published' },
    { title: 'Cosmic Drift (Remixes)', type: 'EP', date: '2026-08-20', streams: 'Pre-Save Active', status: 'Scheduled' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Albums & Singles Discography
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Manage your published discography, album artwork, track orders & pre-save landing pages.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">album</span>
          <span>Create New Release</span>
        </PillButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {releases.map((r) => (
          <div key={r.title} className="glass-panel p-6 rounded-3xl border border-white/40 space-y-3">
            <span className="text-[10px] font-bold text-[#ba0034] uppercase tracking-wider">{r.type}</span>
            <h3 className="font-extrabold text-base text-[#281718] dark:text-white">{r.title}</h3>
            <p className="text-xs text-[#5d3f40] dark:text-zinc-400">Release Date: {r.date}</p>

            <div className="flex justify-between items-center py-2 border-t border-[#e6bcbd]/40 dark:border-white/10 text-xs">
              <span className="font-bold text-[#8d2ebc]">{r.streams}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                r.status === 'Published' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
              }`}>
                {r.status}
              </span>
            </div>

            <button className="w-full py-2 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] font-bold text-xs hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer">
              Edit Metadata & Lyrics
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
