import React from 'react';
import { useNavigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';

export const PromoterPortalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-500 text-white">
            Role Portal • Event Promoter
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-1">
            Concert & Event Promoter Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#5d3f40]">
            Venue booking, ticketing presales, interactive event map staging, and VIP fan access.
          </p>
        </div>
        <PillButton variant="primary" glow onClick={() => navigate('/concerts')}>
          Create New Concert Event
        </PillButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Tickets Sold</p>
          <p className="font-extrabold text-2xl text-amber-600 mt-1">18,450</p>
          <span className="text-[11px] text-emerald-600 font-semibold">92% Capacity Sold</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Gross Revenue</p>
          <p className="font-extrabold text-2xl text-[#ba0034] mt-1">$482,000</p>
          <span className="text-[11px] text-[#5d3f40]">Across 4 Upcoming Shows</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Active Tour Cities</p>
          <p className="font-extrabold text-2xl text-[#00694b] mt-1">12 Cities</p>
          <span className="text-[11px] text-emerald-600 font-semibold">World Acoustic Tour</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Concert Hub & Listing', path: '/concerts', icon: 'confirmation_number', desc: 'Manage event listings and ticket tiers.' },
          { title: 'Interactive Concert Map', path: '/concerts/map', icon: 'map', desc: 'Geographic venue mapping & fan location alerts.' },
          { title: 'Live Stream Event Broadcasting', path: '/concerts/live/conc-1', icon: 'live_tv', desc: 'Ultra-low latency live concert streaming.' },
        ].map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all space-y-2"
          >
            <span className="material-symbols-outlined text-3xl text-amber-500">
              {item.icon}
            </span>
            <h4 className="font-bold text-sm text-[#281718] dark:text-white">
              {item.title}
            </h4>
            <p className="text-xs text-[#5d3f40]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
