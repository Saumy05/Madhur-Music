import React from 'react';

export const ArtistFollowersPage: React.FC = () => {
  const topCities = [
    { city: 'New York, USA', listeners: '420.5K' },
    { city: 'London, UK', listeners: '310.2K' },
    { city: 'Los Angeles, USA', listeners: '280.9K' },
    { city: 'Tokyo, Japan', listeners: '195.4K' },
    { city: 'Berlin, Germany', listeners: '150.1K' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
          Followers & Fanbase Intelligence
        </h1>
        <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
          Demographic breakdowns, top streaming cities, fan tier engagement & VIP subscriber metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-white/40 space-y-2">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">Total Followers</p>
          <h3 className="text-2xl font-extrabold text-[#281718] dark:text-white">1,420,800</h3>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+12.4K this week</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-white/40 space-y-2">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">Monthly Active Listeners</p>
          <h3 className="text-2xl font-extrabold text-[#ba0034]">3,890,500</h3>
          <span className="text-[11px] font-bold text-[#8d2ebc]">Top 0.5% Globally</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-white/40 space-y-2">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">Backstage VIP Subscribers</p>
          <h3 className="text-2xl font-extrabold text-[#8d2ebc]">14,250</h3>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">$85.5K/mo Recurring</span>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <h2 className="text-lg font-extrabold text-[#281718] dark:text-white">Top Listener Geographic Hubs</h2>
        <div className="space-y-3">
          {topCities.map((c) => (
            <div key={c.city} className="p-3 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 flex justify-between items-center text-xs font-semibold">
              <span className="text-[#281718] dark:text-zinc-200">{c.city}</span>
              <span className="text-[#ba0034] font-extrabold">{c.listeners} listeners</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
