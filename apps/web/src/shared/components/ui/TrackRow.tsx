import React, { useState } from 'react';
import { Track, usePlayerStore } from '@/shared/player/usePlayerStore';
import { TrackContextMenuModal } from './TrackContextMenuModal';

interface TrackRowProps {
  track: Track;
  index?: number;
  showAlbum?: boolean;
  playlist?: Track[];
}

export const TrackRow: React.FC<TrackRowProps> = ({
  track,
  index,
  showAlbum = true,
  playlist,
}) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isCurrent = currentTrack?.id === track.id;

  const handlePlayClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      const queueTracks = playlist ? playlist.slice((index ?? 0) + 1) : [];
      playTrack(track, queueTracks);
    }
  };

  return (
    <>
      <div
        onClick={handlePlayClick}
        className={`group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
          isCurrent
            ? 'bg-[#ffe9e9] dark:bg-white/10'
            : 'hover:bg-[#ffe9e9]/60 dark:hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {index !== undefined && (
            <span className="w-5 text-center text-xs font-semibold text-[#5d3f40]">
              {isCurrent && isPlaying ? (
                <span className="material-symbols-outlined text-sm text-[#ba0034] animate-pulse">
                  equalizer
                </span>
              ) : (
                index + 1
              )}
            </span>
          )}

          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={track.coverUrl}
              alt={track.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl">
                {isCurrent && isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <h4
              className={`text-sm font-semibold truncate ${
                isCurrent ? 'text-[#ba0034]' : 'text-[#281718] dark:text-white'
              }`}
            >
              {track.title}
            </h4>
            <p className="text-xs text-[#5d3f40] truncate">
              {track.artist} {showAlbum && `• ${track.album}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {track.isSnippet && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffe9e9] text-[#ba0034] uppercase tracking-wider">
              Snippet
            </span>
          )}
          <span className="text-xs text-[#5d3f40] font-medium hidden sm:inline">
            {track.durationFormatted}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(true);
            }}
            className="text-[#5d3f40] hover:text-[#ba0034] transition-colors p-1 cursor-pointer"
            title="Track options"
          >
            <span className="material-symbols-outlined text-xl">more_vert</span>
          </button>
        </div>
      </div>

      {/* 3-Dots Context Menu Modal */}
      <TrackContextMenuModal
        track={track}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};
