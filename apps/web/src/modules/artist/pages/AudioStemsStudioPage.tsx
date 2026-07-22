import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const AudioStemsStudioPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Raw Multitrack Stems Studio
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Mute or solo Vocals, Drums, Bass, and Guitar tracks for remixing.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-4">
        {['Vocals (Luna Ray)', 'Acoustic Guitar', 'Bass & Percussion', 'Ambient Synthesizer'].map(
          (stem, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#ffe9e9]/50"
            >
              <span className="font-bold text-xs text-[#281718]">{stem}</span>
              <div className="flex items-center gap-2">
                <PillButton variant="secondary" size="sm">
                  Solo
                </PillButton>
                <PillButton variant="ghost" size="sm">
                  Mute
                </PillButton>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
