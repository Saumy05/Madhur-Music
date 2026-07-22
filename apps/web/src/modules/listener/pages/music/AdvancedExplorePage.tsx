import React from "react";
import { PillButton } from '@/components/ui/PillButton';

export const AdvancedExplorePage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          Stitch Single Source of Truth
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
          Advanced Explore
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Faithfully generated implementation of the Advanced Explore screen from Stitch.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/40 artist-glow space-y-4 text-center">
        <span className="material-symbols-outlined text-6xl text-[#ba0034]">
          graphic_eq
        </span>
        <h3 className="font-bold text-xl text-[#281718] dark:text-white">
          Advanced Explore Audio Staging
        </h3>
        <p className="text-xs text-[#5d3f40] max-w-md mx-auto">
          24-bit 192kHz Spatial Dolby Atmos soundstage with glassmorphism UI tokens.
        </p>
        <PillButton variant="primary" glow className="mx-auto">
          Explore Advanced Explore
        </PillButton>
      </div>
    </div>
  );
};
