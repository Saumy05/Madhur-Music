import React, { useState } from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const SongIdentifierPage: React.FC = () => {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="space-y-8 max-w-3xl mx-auto text-center">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Acoustic Song Identifier
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Identify songs playing around you in ambient environments using Madhur AI.
        </p>
      </div>

      <div className="glass-panel p-10 rounded-3xl border border-white/40 artist-glow space-y-6">
        <button
          onClick={() => setIsListening(!isListening)}
          className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center transition-all ${
            isListening
              ? 'premium-gradient text-white animate-ping'
              : 'bg-[#ffe9e9] text-[#ba0034] hover:scale-105'
          }`}
        >
          <span className="material-symbols-outlined text-5xl">mic</span>
        </button>
        <p className="font-bold text-sm text-[#281718] dark:text-white">
          {isListening ? 'Listening to Ambient Audio...' : 'Tap Mic to Identify Song'}
        </p>
      </div>
    </div>
  );
};
