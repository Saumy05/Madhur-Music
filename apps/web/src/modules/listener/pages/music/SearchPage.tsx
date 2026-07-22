import React, { useState, useEffect } from 'react';
import { MOCK_TRACKS } from '@/data/mockData';
import { TrackRow } from '@/components/ui/TrackRow';
import { usePlayerStore } from '@/shared/player/usePlayerStore';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const { catalogTracks, loadCatalog } = usePlayerStore();

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const allSearchable = catalogTracks.length > 0 ? [...catalogTracks, ...MOCK_TRACKS] : MOCK_TRACKS;

  const filtered = allSearchable.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.artist.toLowerCase().includes(query.toLowerCase()) ||
      t.album?.toLowerCase().includes(query.toLowerCase()) ||
      t.genre?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Search & Voice Discovery
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Search published songs, YouTube tracks, artists, or speak to Madhur AI.
        </p>
      </div>

      {/* Large Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-[#ba0034]">
          search
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tracks, artists, or albums..."
          className="w-full pl-12 pr-14 py-4 rounded-3xl glass-panel border border-[#e6bcbd] dark:border-white/20 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#ba0034] shadow-lg"
        />
        <button
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
            isVoiceActive
              ? 'premium-gradient text-white animate-pulse'
              : 'text-[#ba0034] hover:bg-[#ffe9e9]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">mic</span>
        </button>
      </div>

      {isVoiceActive && (
        <div className="glass-panel p-6 rounded-3xl border border-[#ba0034]/40 text-center animate-in fade-in">
          <span className="material-symbols-outlined text-4xl text-[#ba0034] animate-bounce">
            graphic_eq
          </span>
          <p className="font-bold text-sm text-[#281718] dark:text-white mt-2">
            Listening to your voice...
          </p>
          <p className="text-xs text-[#5d3f40]">
            Try saying "Play Locha E Ulfat" or "Play Luna Ray's latest demo"
          </p>
        </div>
      )}

      {/* Search Results List */}
      <div className="space-y-3 pt-4">
        <h2 className="font-bold text-lg text-[#281718] dark:text-white">
          {query ? `Results for "${query}"` : 'Popular Songs & Additions'}
        </h2>
        {filtered.length > 0 ? (
          filtered.map((track, idx) => (
            <TrackRow key={track.id} track={track} index={idx} playlist={filtered} />
          ))
        ) : (
          <p className="text-sm text-[#5d3f40] py-8 text-center">
            No matching tracks found for "{query}".
          </p>
        )}
      </div>
    </div>
  );
};
