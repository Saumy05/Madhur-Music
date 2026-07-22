import React from 'react';

export const PartySyncPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto text-center">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Party Sync Multi-Device Broadcast
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Broadcast audio to nearby phones simultaneously via Wi-Fi Direct.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/40 artist-glow space-y-4">
        <span className="material-symbols-outlined text-6xl text-[#ba0034]">
          sensors
        </span>
        <h3 className="font-bold text-[#281718] dark:text-white">
          Broadcasting Session Code: #892014
        </h3>
      </div>
    </div>
  );
};
