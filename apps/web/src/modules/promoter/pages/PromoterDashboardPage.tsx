import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const PromoterDashboardPage: React.FC = () => {
  const stats = [
    { label: 'Total Tickets Sold', value: '14,280', change: '+1,850 this week', icon: 'confirmation_number' },
    { label: 'Gross Box Office', value: '$892,400', change: '+24.5%', icon: 'trending_up' },
    { label: 'Active Live Events', value: '6 Events', change: '2 Selling Out', icon: 'event_seat' },
    { label: 'Partner Venues', value: '12 Locations', change: 'NYC / LA / London', icon: 'location_city' },
  ];

  const upcomingEvents = [
    { id: 'ev-1', name: 'Madhur Neon Symphony Tour 2026', venue: 'Madison Square Garden, NYC', date: '2026-08-15', sold: '18,500 / 20,000', gross: '$1,295,000', status: '92% Sold' },
    { id: 'ev-2', name: 'Synthwave Midnight Festival', venue: 'The Forum, Los Angeles', date: '2026-09-02', sold: '12,200 / 15,000', gross: '$732,000', status: 'Selling Fast' },
    { id: 'ev-3', name: 'Aria Vance Live Acoustic Unplugged', venue: 'Royal Albert Hall, London', date: '2026-10-10', sold: '5,100 / 5,200', gross: '$408,000', status: 'Sold Out' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#ba0034]/10 text-[#ba0034] text-xs font-bold uppercase tracking-wider">
              Event Promoter Portal
            </span>
            <span className="px-3 py-1 rounded-full bg-[#8d2ebc]/10 text-[#8d2ebc] text-xs font-bold">
              Business Suite
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#281718] dark:text-white">
            Live Concert & Tour Manager
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-300 mt-1">
            Box office real-time ticketing analytics, headliner bookings, seating capacity tiers & ad campaigns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PillButton variant="primary" glow>
            <span className="material-symbols-outlined text-lg">add_location_alt</span>
            <span>Create New Tour Event</span>
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
          <span className="material-symbols-outlined text-[#ba0034]">event_seat</span>
          Active Promoting Events & Box Office Status
        </h2>

        <div className="space-y-3">
          {upcomingEvents.map((ev) => (
            <div key={ev.id} className="p-4 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#ba0034] uppercase">{ev.id} • {ev.date}</span>
                <h3 className="font-extrabold text-sm text-[#281718] dark:text-white">{ev.name}</h3>
                <p className="text-xs text-[#5d3f40] dark:text-zinc-400">Venue: {ev.venue} | Gross: {ev.gross}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-extrabold text-[#8d2ebc] block">{ev.sold} Tickets</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{ev.status}</span>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-[#ba0034] text-white font-bold text-xs hover:bg-[#a0002d] transition-all cursor-pointer">
                  Manage Seating & Scans
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
