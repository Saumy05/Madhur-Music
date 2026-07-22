import React, { useState } from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const EqualizerPresetsPage: React.FC = () => {
  const [activePreset, setActivePreset] = useState('Spatial Atmos');

  const presets = [
    { name: 'Spatial Atmos', desc: 'Lush 3D binaural staging with open acoustic room' },
    { name: 'Bass Boost Pro', desc: 'Sub-bass boost for electronic & synthwave tracks' },
    { name: 'Vocal Clarity', desc: 'Mid-range elevation for intimate acoustic singers' },
    { name: 'Studio Flat', desc: 'Neutral frequency curve for mixing engineers' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Equalizer Hardware Presets
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Custom frequency profiles tuned for headphones, speakers, and car audio.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {presets.map((p) => (
          <div
            key={p.name}
            onClick={() => setActivePreset(p.name)}
            className={`glass-panel p-6 rounded-3xl border cursor-pointer transition-all ${
              activePreset === p.name
                ? 'border-[#ba0034] bg-[#ffe9e9]/80 artist-glow'
                : 'border-white/40'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-base text-[#281718] dark:text-white">
                {p.name}
              </h3>
              {activePreset === p.name && (
                <span className="text-xs font-bold text-[#ba0034]">Active</span>
              )}
            </div>
            <p className="text-xs text-[#5d3f40]">{p.desc}</p>
          </div>
        ))}
      </div>

      <PillButton variant="primary" glow className="mx-auto">
        Save Custom Hardware Preset
      </PillButton>
    </div>
  );
};
