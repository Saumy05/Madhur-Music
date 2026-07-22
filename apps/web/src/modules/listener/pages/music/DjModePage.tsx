import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const DjModePage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          Live AI Crossfader
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
          Smart AI DJ Mode
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Seamless BPM matching, harmonic key blending, and automatic vocal crossfades.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/40 artist-glow text-center space-y-4">
        <span className="material-symbols-outlined text-6xl text-[#ba0034]">
          album
        </span>
        <h3 className="font-bold text-xl text-[#281718] dark:text-white">
          Active Decks: Deck A (124 BPM) ↔ Deck B (126 BPM)
        </h3>
        <PillButton variant="primary" glow className="mx-auto">
          Trigger Auto-Transition Drop
        </PillButton>
      </div>
    </div>
  );
};
