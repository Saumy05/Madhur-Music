import React from 'react';
import { useParams } from 'react-router';
import { MOCK_TRACKS } from '@/data/mockData';
import { TrackRow } from '@/components/ui/TrackRow';
import { PillButton } from '@/components/ui/PillButton';
import { usePlayerStore } from '@/shared/player/usePlayerStore';

export const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();

  const handlePlayPlaylist = () => {
    if (MOCK_TRACKS.length > 0) {
      const isPlaylistLoaded = MOCK_TRACKS.some(t => t.id === currentTrack?.id);
      if (isPlaylistLoaded) {
        togglePlay();
      } else {
        playTrack(MOCK_TRACKS[0], MOCK_TRACKS.slice(1));
      }
    }
  };

  const isCurrentPlaylistPlaying = isPlaying && MOCK_TRACKS.some(t => t.id === currentTrack?.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow">
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80"
          alt="Playlist Cover"
          className="w-44 h-44 rounded-2xl object-cover artist-glow"
        />
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#ba0034]">
            Playlist • Custom Edition #{id || '1'}
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
            Late Night Acoustic Echoes
          </h1>
          <p className="text-xs text-[#5d3f40]">
            Curated by Madhur AI • 12 Tracks • 42 mins
          </p>
          <div className="pt-3 flex justify-center sm:justify-start gap-3">
            <PillButton variant="primary" glow onClick={handlePlayPlaylist}>
              <span className="material-symbols-outlined text-lg">
                {isCurrentPlaylistPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isCurrentPlaylistPlaying ? 'Pause Playlist' : 'Play Playlist'}</span>
            </PillButton>
            <PillButton variant="secondary">
              <span className="material-symbols-outlined text-lg">edit</span>
              Smart Edit
            </PillButton>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {MOCK_TRACKS.map((track, idx) => (
          <TrackRow
            key={track.id}
            track={track}
            index={idx}
            playlist={MOCK_TRACKS}
          />
        ))}
      </div>
    </div>
  );
};
