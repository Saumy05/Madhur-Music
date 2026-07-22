import React, { useState } from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const ArtistUploadPage: React.FC = () => {
  const [trackName, setTrackName] = useState('');
  const [genre, setGenre] = useState('Pop / Electronic');

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
          Upload Music & Multitrack Stems
        </h1>
        <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
          Upload 24-bit 192kHz WAV master files, configure songwriting splits, lyric synchronization & artwork.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-5">
        <div className="border-2 border-dashed border-[#ba0034]/40 p-8 rounded-3xl text-center space-y-3 bg-[#ffe9e9]/30 dark:bg-white/5">
          <div className="w-16 h-16 mx-auto rounded-2xl premium-gradient flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-3xl">cloud_upload</span>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#281718] dark:text-white">Drag and drop audio master</h3>
            <p className="text-xs text-[#5d3f40] dark:text-zinc-400">WAV, FLAC, AIFF or High-Res ALAC (Max 2GB per file)</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1">Track / Single Title</label>
            <input
              type="text"
              placeholder="e.g. Celestial Echoes (Original Mix)"
              value={trackName}
              onChange={(e) => setTrackName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1">Primary Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-semibold"
            >
              <option value="Pop / Electronic">Pop / Electronic</option>
              <option value="Hip-Hop / Trap">Hip-Hop / Trap</option>
              <option value="Indie / Rock">Indie / Rock</option>
              <option value="R&B / Soul">R&B / Soul</option>
              <option value="Classical / Ambient">Classical / Ambient</option>
            </select>
          </div>

          <PillButton variant="primary" glow className="w-full py-3">
            Submit Master Track to Distribution Queue
          </PillButton>
        </div>
      </div>
    </div>
  );
};
