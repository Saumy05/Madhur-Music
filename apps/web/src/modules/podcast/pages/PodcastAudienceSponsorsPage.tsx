import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const PodcastAudienceSponsorsPage: React.FC = () => {
  const sponsors = [
    { name: 'Sennheiser Pro Audio', tier: 'Title Sponsor', CPM: '$35.00', earnings: '$8,400', status: 'Active Campaign' },
    { name: 'Squarespace', tier: 'Mid-Roll Ad', CPM: '$22.00', earnings: '$5,280', status: 'Active Campaign' },
    { name: 'Audio-Technica', tier: 'Pre-Roll Spot', CPM: '$18.00', earnings: '$4,770', status: 'Pending Renewal' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Podcast Monetization & Sponsors
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Manage mid-roll dynamic ad insertions, sponsor contracts, host-read promos & listener subscriptions.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">handshake</span>
          <span>Apply for Marketplace Sponsors</span>
        </PillButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-white/40 space-y-2">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">Total Ad Impressions</p>
          <h3 className="text-2xl font-extrabold text-[#281718] dark:text-white">520.4K</h3>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+18.9% this month</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-white/40 space-y-2">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">Average Blended CPM</p>
          <h3 className="text-2xl font-extrabold text-[#ba0034]">$28.40</h3>
          <span className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400">Top 5% Tech Podcasts</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-white/40 space-y-2">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">Total Monthly Earnings</p>
          <h3 className="text-2xl font-extrabold text-[#8d2ebc]">$18,450</h3>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Direct ACH Transfer</span>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <h2 className="text-lg font-extrabold text-[#281718] dark:text-white">Active Sponsor Agreements</h2>
        <div className="space-y-3">
          {sponsors.map((s) => (
            <div key={s.name} className="p-4 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-sm text-[#281718] dark:text-white">{s.name}</h4>
                <p className="text-xs text-[#5d3f40] dark:text-zinc-400">Slot: {s.tier} | CPM: {s.CPM} | Total Payout: {s.earnings}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  s.status === 'Active Campaign' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}>
                  {s.status}
                </span>

                <button className="px-3 py-1.5 rounded-xl bg-[#ba0034] text-white font-bold text-xs hover:bg-[#a0002d] transition-all cursor-pointer">
                  Script Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
