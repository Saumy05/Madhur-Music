import React from 'react';
import { useNavigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';

export const PodcastPortalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#8d2ebc] text-white">
            Role Portal • Podcast Host
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-1">
            Podcast Creator & Host Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#5d3f40]">
            Episode publishing, RSS feed distribution, listener retention graphs, and sponsor ad insertion.
          </p>
        </div>
        <PillButton variant="primary" glow onClick={() => navigate('/podcasts/studio')}>
          Publish New Episode
        </PillButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Total Downloads</p>
          <p className="font-extrabold text-2xl text-[#8d2ebc] mt-1">84,200</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Across 24 Episodes</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Subscribed Listeners</p>
          <p className="font-extrabold text-2xl text-[#ba0034] mt-1">12,490</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Active RSS Subscribers</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Ad Revenue</p>
          <p className="font-extrabold text-2xl text-[#00694b] mt-1">$4,820</p>
          <span className="text-[11px] text-[#5d3f40]">Dynamic Insertions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => navigate('/podcasts/studio')}
          className="glass-panel p-6 rounded-3xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all space-y-2"
        >
          <span className="material-symbols-outlined text-4xl text-[#8d2ebc]">
            mic_external_on
          </span>
          <h4 className="font-bold text-base text-[#281718] dark:text-white">
            Podcast Recording & Audio Studio
          </h4>
          <p className="text-xs text-[#5d3f40]">
            Multi-track voice isolation, intro/outro insertion, and chapter marker editing.
          </p>
        </div>

        <div
          onClick={() => navigate('/podcast-subscriptions')}
          className="glass-panel p-6 rounded-3xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all space-y-2"
        >
          <span className="material-symbols-outlined text-4xl text-[#ba0034]">
            subscriptions
          </span>
          <h4 className="font-bold text-base text-[#281718] dark:text-white">
            Subscriber Management & Feeds
          </h4>
          <p className="text-xs text-[#5d3f40]">
            Manage premium subscriber feeds, bonus episodes, and RSS syndication keys.
          </p>
        </div>
      </div>
    </div>
  );
};
