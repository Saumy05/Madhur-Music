import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const LabelContractsCopyrightPage: React.FC = () => {
  const contracts = [
    { id: 'REC-2025-09', artist: 'Aria Vance', type: 'Exclusive Recording Deal', term: '3 Albums', advance: '$150,000', copyrightOwner: 'Apex Master Rights LLC', expiry: '2028-11-30' },
    { id: 'LIC-2026-02', artist: 'Cosmic Pulse', type: 'Master License Agreement', term: '5 Years', advance: '$80,000', copyrightOwner: 'Cosmic Pulse & Apex', expiry: '2031-01-15' },
    { id: 'PUB-2025-11', artist: 'Devon Noir', type: 'Co-Publishing & Admin', term: '2 Years', advance: '$45,000', copyrightOwner: 'Apex Music Pub Ltd', expiry: '2027-10-31' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Contracts & Copyright Governance
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Legal recording contracts, mechanical license terms, US Copyright Office registration & IP ownership.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">gavel</span>
          <span>Draft New Legal Agreement</span>
        </PillButton>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {contracts.map((c) => (
          <div key={c.id} className="glass-panel p-6 rounded-3xl border border-white/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-[#ba0034] uppercase tracking-wider">{c.id}</span>
                <h3 className="font-extrabold text-lg text-[#281718] dark:text-white">{c.artist} — {c.type}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#8d2ebc]/10 text-[#8d2ebc] font-bold text-xs self-start sm:self-auto">
                Term: {c.term}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#ffe9e9]/50 dark:bg-white/5 rounded-2xl text-xs">
              <div>
                <span className="text-[#5d3f40] dark:text-zinc-400 font-semibold block text-[10px]">Unrecouped Advance:</span>
                <strong className="text-[#281718] dark:text-white font-extrabold">{c.advance}</strong>
              </div>
              <div>
                <span className="text-[#5d3f40] dark:text-zinc-400 font-semibold block text-[10px]">Registered IP Holder:</span>
                <strong className="text-[#ba0034] font-extrabold">{c.copyrightOwner}</strong>
              </div>
              <div>
                <span className="text-[#5d3f40] dark:text-zinc-400 font-semibold block text-[10px]">Contract Expiration:</span>
                <strong className="text-[#281718] dark:text-white font-extrabold">{c.expiry}</strong>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button className="px-4 py-2 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] font-bold text-xs hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer">
                Download PDF Contract
              </button>
              <button className="px-4 py-2 rounded-xl border border-[#e6bcbd]/40 text-[#281718] dark:text-white font-bold text-xs hover:bg-[#ffe9e9] transition-all cursor-pointer">
                Audit Log
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
