import React from 'react';
import { useParams } from 'react-router';
import { MOCK_ALBUMS, MOCK_TRACKS } from '@/data/mockData';
import { TrackRow } from '@/components/ui/TrackRow';
import { PillButton } from '@/components/ui/PillButton';
import { usePlayerStore } from '@/shared/player/usePlayerStore';

export const AlbumDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const album = MOCK_ALBUMS.find((a) => a.id === id) || MOCK_ALBUMS[0];
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();

  const handlePlayAlbum = () => {
    if (MOCK_TRACKS.length > 0) {
      // If the album is already loaded and we just want to toggle play state
      const isAlbumLoaded = MOCK_TRACKS.some(t => t.id === currentTrack?.id);
      if (isAlbumLoaded) {
        togglePlay();
      } else {
        playTrack(MOCK_TRACKS[0], MOCK_TRACKS.slice(1));
      }
    }
  };

  const isCurrentAlbumPlaying = isPlaying && MOCK_TRACKS.some(t => t.id === currentTrack?.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow">
        <img
          src={album.coverUrl}
          alt={album.title}
          className="w-48 h-48 rounded-2xl object-cover artist-glow"
        />
        <div className="text-center sm:text-left space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#ba0034]">
            Album • {album.releaseYear} • Spatial Dolby Atmos
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
            {album.title}
          </h1>
          <p className="text-sm font-semibold text-[#5d3f40]">
            Artist: {album.artist} • {album.genre}
          </p>
          <div className="pt-3 flex justify-center sm:justify-start gap-3">
            <PillButton variant="primary" glow onClick={handlePlayAlbum}>
              <span className="material-symbols-outlined text-lg">
                {isCurrentAlbumPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isCurrentAlbumPlaying ? 'Pause Album' : 'Play Album'}</span>
            </PillButton>
            <PillButton variant="secondary">
              <span className="material-symbols-outlined text-lg">favorite</span>
              Save to Library
            </PillButton>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-bold text-xl text-[#281718] dark:text-white">
          Tracklist
        </h2>
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
