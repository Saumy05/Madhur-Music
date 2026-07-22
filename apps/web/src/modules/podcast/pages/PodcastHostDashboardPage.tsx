import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const PodcastHostDashboardPage: React.FC = () => {
  const stats = [
    { label: 'Total Episode Listens', value: '1.4M', change: '+22.1%', icon: 'headphones' },
    { label: 'Subscribed Listeners', value: '84.6K', change: '+4.2K this month', icon: 'subscriptions' },
    { label: 'Ad Revenue Earnings', value: '$18,450', change: '+15.8%', icon: 'monetization_on' },
    { label: 'Completion Rate', value: '78.4%', change: '+3.1%', icon: 'equalizer' },
  ];

  const recentEpisodes = [
    { id: 'ep-104', title: 'Ep 104: The Future of Spatial Audio & Multitrack Production', date: '2026-07-18', duration: '54 mins', downloads: '48.2K', sponsors: 'Sennheiser & Dolby' },
    { id: 'ep-103', title: 'Ep 103: Inside Independent Music Labels with Guest Aria Vance', date: '2026-07-11', duration: '62 mins', downloads: '61.9K', sponsors: 'Squarespace' },
    { id: 'ep-102', title: 'Ep 102: AI Music Composition & Copyright Ethics', date: '2026-07-04', duration: '48 mins', downloads: '55.4K', sponsors: 'Audio-Technica' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#ba0034]/10 text-[#ba0034] text-xs font-bold uppercase tracking-wider">
              Podcast Host Suite
            </span>
            <span className="px-3 py-1 rounded-full bg-[#8d2ebc]/10 text-[#8d2ebc] text-xs font-bold">
              Show RSS Manager
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#281718] dark:text-white">
            "The Sonic Pulse Podcast" Host Studio
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-300 mt-1">
            Publish weekly episodes, manage dynamic ad insertion, track audience retention & sponsor payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PillButton variant="primary" glow>
            <span className="material-symbols-outlined text-lg">mic</span>
            <span>Upload New Episode</span>
          </PillButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-panel p-5 rounded-3xl border border-white/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034]">
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {s.change}
              </span>
            </div>
            <div>
              <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">{s.label}</p>
              <h3 className="text-2xl font-extrabold text-[#281718] dark:text-white">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <h2 className="text-lg font-extrabold text-[#281718] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ba0034]">graphic_eq</span>
          Recent Published Episodes
        </h2>

        <div className="space-y-3">
          {recentEpisodes.map((ep) => (
            <div key={ep.id} className="p-4 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#ba0034] uppercase">{ep.id} • {ep.date}</span>
                <h3 className="font-extrabold text-sm text-[#281718] dark:text-white">{ep.title}</h3>
                <p className="text-xs text-[#5d3f40] dark:text-zinc-400">Duration: {ep.duration} | Sponsors: {ep.sponsors}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-extrabold text-[#8d2ebc] block">{ep.downloads} Listens</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">100% Monetized</span>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-[#ba0034] text-white font-bold text-xs hover:bg-[#a0002d] transition-all cursor-pointer">
                  Episode Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
