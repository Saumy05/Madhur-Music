import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const AudioCachePage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Audio Memory & Cache Manager
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Manage pre-buffered audio chunks and clear temporary streaming cache.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 artist-glow space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm text-[#281718] dark:text-white">
            Pre-buffered Audio Chunks
          </span>
          <span className="font-extrabold text-sm text-[#ba0034]">1.2 GB</span>
        </div>
        <PillButton variant="secondary" className="w-full">
          Clear Stream Cache
        </PillButton>
      </div>
    </div>
  );
};
