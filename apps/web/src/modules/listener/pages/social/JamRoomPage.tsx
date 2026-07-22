import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const JamRoomPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          Real-time Audio Session
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
          Live Jam Room
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Listen together in lossless audio sync with chat and spatial sound stages.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="font-bold text-lg text-[#281718] dark:text-white">
              Room: Late Night Chill & Lo-Fi
            </h3>
          </div>
          <span className="text-xs font-bold text-[#ba0034]">14 Listeners Active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#e6bcbd]/40">
          {['Rhea Patel', 'Vivan Kapoor', 'Aarav S.', 'You'].map((name, i) => (
            <div
              key={i}
              className="glass-panel p-3 rounded-xl text-center border border-white/30"
            >
              <div className="w-12 h-12 rounded-full mx-auto mb-2 bg-[#ffe9e9] flex items-center justify-center font-bold text-[#ba0034]">
                {name[0]}
              </div>
              <p className="text-xs font-bold text-[#281718] dark:text-white truncate">
                {name}
              </p>
              <span className="text-[10px] text-emerald-600 font-semibold">In Sync</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <PillButton variant="secondary">Invite Friend</PillButton>
          <PillButton variant="primary">Pass DJ Control</PillButton>
        </div>
      </div>
    </div>
  );
};
