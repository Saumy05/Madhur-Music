import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MOCK_ALBUMS, MOCK_TRACKS } from '@/data/mockData';
import { AlbumCard } from '@/components/ui/AlbumCard';
import { TrackRow } from '@/components/ui/TrackRow';
import { PillButton } from '@/components/ui/PillButton';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { usePlayerStore } from '@/shared/player/usePlayerStore';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { playTrack, currentTrack, isPlaying, togglePlay, catalogTracks, loadCatalog } = usePlayerStore();

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const allTracks = [...catalogTracks, ...MOCK_TRACKS];

  const handlePlayRecommended = () => {
    if (allTracks.length > 0) {
      const isTracksPlaying = allTracks.some(t => t.id === currentTrack?.id);
      if (isTracksPlaying) {
        togglePlay();
      } else {
        playTrack(allTracks[0], allTracks.slice(1));
      }
    }
  };

  const isCurrentListPlaying = isPlaying && allTracks.some(t => t.id === currentTrack?.id);

  // Time-based greeting
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good Morning';
    if (hr < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* 1. Header Greeting & Hero Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
            Madhur Ecosystem
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
            {getGreeting()}, {user?.name || 'Music Lover'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5d3f40] dark:text-zinc-400">
            Welcome back. Ready to experience 24-bit 192kHz Spatial Dolby Atmos today?
          </p>
        </div>

        <PillButton variant="primary" glow onClick={handlePlayRecommended}>
          <span className="material-symbols-outlined text-lg">
            {isCurrentListPlaying ? 'pause' : 'play_arrow'}
          </span>
          <span>{isCurrentListPlaying ? 'Pause Station' : 'Quick Play Recommended'}</span>
        </PillButton>
      </div>

      {/* 2. Premium Promotional Banner */}
      <div className="relative w-full rounded-3xl overflow-hidden glass-panel border border-white/40 artist-glow p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#ffe9e9]/50 via-transparent to-[#ffe9e9]/10">
        <div className="space-y-3 text-center md:text-left">
          <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-[#ba0034] text-white">
            Dolby Spatial
          </span>
          <h3 className="font-black text-xl sm:text-2xl text-[#281718] dark:text-white leading-tight">
            Hi-Res Audio Headroom Calibrator
          </h3>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-300 max-w-md">
            Optimize your headphones with our custom 10-band spatial hardware equalizer profiles.
          </p>
        </div>
        <PillButton
          variant="secondary"
          onClick={() => navigate('/listener/spatial-calibrator')}
          className="whitespace-nowrap cursor-pointer"
        >
          Calibrate Staging
        </PillButton>
      </div>

      {/* 3. Featured Albums Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-xl text-[#281718] dark:text-white">
            Featured Albums & Series
          </h2>
          <button
            onClick={() => navigate('/listener/explore')}
            className="text-xs font-bold text-[#ba0034] hover:underline cursor-pointer"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {MOCK_ALBUMS.slice(0, 3).map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              artist={album.artist}
              coverUrl={album.coverUrl}
              subtitle={`${album.trackCount} Tracks • ${album.genre}`}
              onClick={() => navigate(`/listener/album/${album.id}`)}
            />
          ))}
        </div>
      </div>

      {/* 4. Recommended Tracks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-xl text-[#281718] dark:text-white">
            Recommended Listening for You
          </h2>
          <button
            onClick={() => navigate('/listener/explore')}
            className="text-xs font-bold text-[#ba0034] hover:underline cursor-pointer"
          >
            Show More
          </button>
        </div>

        <div className="space-y-2">
          {allTracks.map((track, idx) => (
            <TrackRow
              key={track.id}
              track={track}
              index={idx}
              playlist={allTracks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
