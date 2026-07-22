import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const PodcastStudioPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          Creator Dashboard
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
          Podcast Creator Studio
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Upload episodes, analyze listener demographics, and manage RSS feeds.
        </p>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Total Downloads</p>
          <p className="font-extrabold text-2xl text-[#ba0034] mt-1">128,450</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ +14% this month</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Subscribers</p>
          <p className="font-extrabold text-2xl text-[#8d2ebc] mt-1">18,290</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ +8% this month</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Est. Revenue</p>
          <p className="font-extrabold text-2xl text-[#00694b] mt-1">$2,450.00</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Payout scheduled</span>
        </div>
      </div>

      {/* Upload New Episode Form Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-4">
        <h3 className="font-bold text-lg text-[#281718] dark:text-white">
          Upload & Publish New Episode
        </h3>
        <div className="border-2 border-dashed border-[#e6bcbd] dark:border-white/20 p-8 rounded-2xl text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-[#ba0034]">
            cloud_upload
          </span>
          <p className="text-sm font-semibold text-[#281718] dark:text-white">
            Drag and drop audio file (WAV, MP3, FLAC) up to 24-bit 96kHz
          </p>
          <PillButton variant="secondary" size="sm">
            Browse File
          </PillButton>
        </div>
      </div>
    </div>
  );
};
