import React from 'react';

export const OfflineVaultPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Encrypted Offline Vault
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          AES-256 encrypted local storage for high-resolution 24-bit FLAC audio.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/40 artist-glow text-center space-y-3">
        <span className="material-symbols-outlined text-6xl text-[#ba0034]">
          lock
        </span>
        <h3 className="font-bold text-lg text-[#281718] dark:text-white">
          Vault Status: Encrypted & Offline Enabled
        </h3>
      </div>
    </div>
  );
};
