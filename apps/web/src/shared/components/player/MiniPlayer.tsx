import React from 'react';
import { usePlayerStore } from '@/shared/player/usePlayerStore';

export const MiniPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    nextTrack,
    previousTrack,
    setFullPlayerOpen,
  } = usePlayerStore();

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      onClick={() => setFullPlayerOpen(true)}
      className="fixed bottom-[65px] lg:bottom-4 left-3 right-3 lg:left-68 lg:right-6 z-40 cursor-pointer"
    >
      <div className="glass-panel h-16 rounded-full border border-white/60 dark:border-white/20 artist-glow flex items-center px-4 relative overflow-hidden transition-all duration-300 hover:scale-[1.01]">
        {/* Top Edge Gradient Progress Bar */}
        <div
          className="absolute top-0 left-0 h-[3px] premium-gradient transition-all duration-300 shadow-[0_0_8px_rgba(186,0,52,0.5)]"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Album Cover Thumbnail */}
        <div className="w-10 h-10 rounded-xl overflow-hidden mr-3 flex-shrink-0">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Track Title & Artist */}
        <div className="flex-grow min-w-0 mr-4">
          <h4 className="font-semibold text-xs text-[#281718] dark:text-white truncate">
            {currentTrack.title}
          </h4>
          <p className="text-[10px] text-[#5d3f40] uppercase tracking-wider truncate">
            {currentTrack.artist}
          </p>
        </div>

        {/* Controls */}
        <div
          className="flex items-center gap-3 text-[#281718] dark:text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={previousTrack}
            className="p-1 hover:text-[#ba0034] transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined text-xl">
              skip_previous
            </span>
          </button>

          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full premium-gradient flex items-center justify-center text-white active:scale-90 transition-transform shadow-md"
          >
            <span className="material-symbols-outlined text-xl">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={nextTrack}
            className="p-1 hover:text-[#ba0034] transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined text-xl">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
