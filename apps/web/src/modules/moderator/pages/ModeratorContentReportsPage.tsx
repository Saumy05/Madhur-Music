import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const ModeratorContentReportsPage: React.FC = () => {
  const reports = [
    { id: 'REP-101', title: 'Track: "Summer Bass Blast"', reason: 'Explicit content without advisory tag', reportsCount: 14, date: '2026-07-20', status: 'Pending Review' },
    { id: 'REP-102', title: 'Podcast: "Cryptic Whispers Ep 4"', reason: 'Misleading info & harassment flag', reportsCount: 29, date: '2026-07-19', status: 'Pending Review' },
    { id: 'REP-103', title: 'Playlist: "Hate Wave Beats"', reason: 'Inappropriate playlist title', reportsCount: 8, date: '2026-07-18', status: 'Resolved (Renamed)' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Reported Songs & Podcast Moderation
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Audit user flags for explicit content, hate speech, offensive lyrics, and spam metadata.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">fact_check</span>
          <span>Mark Selected as Safe</span>
        </PillButton>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r.id} className="p-4 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#ba0034] uppercase">{r.id} • {r.date}</span>
                <h3 className="font-extrabold text-sm text-[#281718] dark:text-white">{r.title}</h3>
                <p className="text-xs text-[#5d3f40] dark:text-zinc-400">Reason: {r.reason} ({r.reportsCount} user reports)</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all cursor-pointer">
                  Approve Tag
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-[#ba0034] text-white font-bold text-xs hover:bg-[#a0002d] transition-all cursor-pointer">
                  Remove Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
