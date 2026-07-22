import React from 'react';
import { MOCK_TRACKS } from '@/data/mockData';
import { TrackRow } from '@/components/ui/TrackRow';

export const DownloadsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Offline Downloads Vault
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          24-bit 192kHz FLAC Lossless tracks downloaded for offline playback.
        </p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#281718] dark:text-white">
            Offline Storage Used
          </p>
          <p className="text-xs text-[#5d3f40]">4.2 GB of 32 GB available</p>
        </div>
        <span className="text-xs font-extrabold text-[#ba0034]">18 Tracks Ready</span>
      </div>

      <div className="space-y-2">
        {MOCK_TRACKS.map((track, idx) => (
          <TrackRow key={track.id} track={track} index={idx} />
        ))}
      </div>
    </div>
  );
};
