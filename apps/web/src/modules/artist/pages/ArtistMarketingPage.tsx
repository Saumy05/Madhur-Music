import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const ArtistMarketingPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Artist Marketing Suite & Pre-save Campaigns
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Create pre-save links, target top audiophile listeners, and launch Backstage drops.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/40 artist-glow space-y-6 text-center">
        <span className="material-symbols-outlined text-6xl text-[#ba0034]">
          campaign
        </span>
        <h3 className="font-bold text-xl text-[#281718] dark:text-white">
          Active Campaign: "Studio Sessions Vinyl Pre-order"
        </h3>
        <p className="text-xs text-[#5d3f40] max-w-md mx-auto">
          4,890 Pre-saves registered across Spotify, Apple Music, and Madhur Backstage.
        </p>
        <PillButton variant="primary" glow className="mx-auto">
          Create New Campaign Link
        </PillButton>
      </div>
    </div>
  );
};
