import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const ModeratorCopyrightClaimsPage: React.FC = () => {
  const claims = [
    { id: 'DMCA-904', claimant: 'Warner Music Group Legal', infringesOn: 'Composition "Midnight Glow"', suspectTrack: '"Shadows of Night" by RemixLord', status: 'Counter-Notice Window (10 Days)' },
    { id: 'DMCA-905', claimant: 'Universal Music Publishing', infringesOn: 'Vocal Stem from "Velvet Horizon"', suspectTrack: '"Velvet Remix Unofficial"', status: 'Immediate Takedown Executed' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Copyright Claims & DMCA Dispute System
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Automated acoustic fingerprint matching, DMCA takedown notices, counter-notifications & safe harbor compliance.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">gavel</span>
          <span>Submit Direct Takedown Notice</span>
        </PillButton>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {claims.map((c) => (
          <div key={c.id} className="glass-panel p-6 rounded-3xl border border-white/40 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#ba0034] uppercase">{c.id}</span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">{c.status}</span>
            </div>

            <h3 className="font-extrabold text-base text-[#281718] dark:text-white">Claimant: {c.claimant}</h3>
            <p className="text-xs text-[#5d3f40] dark:text-zinc-300">Infringes On: <strong>{c.infringesOn}</strong> | Target: <strong>{c.suspectTrack}</strong></p>

            <div className="flex gap-2 pt-2">
              <button className="px-3 py-1.5 rounded-xl bg-[#ba0034] text-white font-bold text-xs hover:bg-[#a0002d] transition-all cursor-pointer">
                Issue DMCA Takedown
              </button>
              <button className="px-3 py-1.5 rounded-xl border border-[#e6bcbd]/40 text-[#281718] dark:text-white font-bold text-xs hover:bg-[#ffe9e9] transition-all cursor-pointer">
                View Audio Fingerprint Match
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
