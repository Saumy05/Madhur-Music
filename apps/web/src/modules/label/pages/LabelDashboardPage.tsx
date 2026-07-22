import React, { useState } from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const LabelDashboardPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Quarter');

  const stats = [
    { label: 'Total Catalog Streams', value: '48.2M', change: '+18.4%', trend: 'up', icon: 'equalizer' },
    { label: 'Active Roster Artists', value: '24', change: '+3 Signed', trend: 'up', icon: 'recent_actors' },
    { label: 'Gross Royalty Revenue', value: '$342,850', change: '+12.6%', trend: 'up', icon: 'account_balance' },
    { label: 'Pending Payout Claims', value: '8 Claims', change: '-2 resolved', trend: 'down', icon: 'request_quote' },
  ];

  const topReleases = [
    { title: 'Velvet Horizon LP', artist: 'Aria Vance', streams: '12.4M', revenue: '$88,200', status: 'Platinum' },
    { title: 'Neon Echoes EP', artist: 'Cosmic Pulse', streams: '8.1M', revenue: '$54,100', status: 'Gold' },
    { title: 'Midnight Serenade', artist: 'Devon Noir', streams: '5.6M', revenue: '$39,400', status: 'Trending' },
    { title: 'Electric Reverie', artist: 'Luna Sterling', streams: '4.2M', revenue: '$28,900', status: 'Active' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#ba0034]/10 text-[#ba0034] text-xs font-bold uppercase tracking-wider">
              Music Label Executive Portal
            </span>
            <span className="px-3 py-1 rounded-full bg-[#8d2ebc]/10 text-[#8d2ebc] text-xs font-bold">
              Enterprise Suite
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#281718] dark:text-white">
            Apex Music Group Dashboard
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-300 mt-1">
            Global catalog distribution, master licensing rights, royalty splits & roster analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-bold text-[#ba0034] border border-[#e6bcbd]/40 cursor-pointer"
          >
            <option value="This Month">This Month</option>
            <option value="This Quarter">This Quarter</option>
            <option value="Year to Date">Year to Date</option>
          </select>

          <PillButton variant="primary" glow>
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span>Register New Master</span>
          </PillButton>
        </div>
      </div>

      {/* KPI Cards Grid */}
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

      {/* Top Performing Releases Table */}
      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#281718] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba0034]">verified</span>
            Top Label Releases ({selectedPeriod})
          </h2>
          <button className="text-xs font-bold text-[#ba0034] hover:underline cursor-pointer">
            View All Catalog Masters →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e6bcbd]/40 dark:border-white/10 text-[#5d3f40] dark:text-zinc-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Release Title</th>
                <th className="py-3 px-4">Signed Artist</th>
                <th className="py-3 px-4">Global Streams</th>
                <th className="py-3 px-4">Royalty Earnings</th>
                <th className="py-3 px-4">Certification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6bcbd]/20 dark:divide-white/5 font-semibold text-[#281718] dark:text-zinc-200">
              {topReleases.map((row) => (
                <tr key={row.title} className="hover:bg-[#ffe9e9]/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#ba0034]">{row.title}</td>
                  <td className="py-3.5 px-4">{row.artist}</td>
                  <td className="py-3.5 px-4">{row.streams}</td>
                  <td className="py-3.5 px-4">{row.revenue}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#8d2ebc]/10 text-[#8d2ebc] font-bold text-[11px]">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="px-3 py-1 rounded-full bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] font-bold hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer">
                      Splits & Statements
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
