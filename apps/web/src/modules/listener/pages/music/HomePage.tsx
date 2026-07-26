import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { MOCK_ALBUMS, MOCK_TRACKS } from '@/data/mockData';
import { AlbumCard } from '@/components/ui/AlbumCard';
import { TrackRow } from '@/components/ui/TrackRow';
import { PillButton } from '@/components/ui/PillButton';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { usePlayerStore } from '@/shared/player/usePlayerStore';
import { fetchBanners, Banner } from '@/data/songsApi';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { playTrack, currentTrack, isPlaying, togglePlay, catalogTracks, loadCatalog } = usePlayerStore();
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    loadCatalog();
    fetchBanners('HOME')
      .then((data) => setBanners(data))
      .catch(() => { /* silent fallback */ });
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

  // Fallback banner if DB banners array is empty
  const activeBanners: Partial<Banner>[] = banners.length > 0 ? banners : [
    {
      id: 'fb-1',
      title: 'Hi-Res Audio Headroom Calibrator',
      subtitle: 'Dolby Spatial Soundstage Staging',
      description: 'Optimize your headphones with our custom 10-band spatial hardware equalizer profiles.',
      badgeText: 'Dolby Spatial',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80',
      ctaText: 'Calibrate Staging',
      ctaLink: '/listener/spatial-calibrator',
    },
  ];

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

      {/* 2. Admin-Configured Promotional Banners (Rendered in exact sequence order) */}
      <div className="space-y-6">
        {activeBanners.map((banner) => (
          <div
            key={banner.id}
            className="relative w-full rounded-3xl overflow-hidden glass-panel border border-white/40 artist-glow p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#ffe9e9]/50 via-transparent to-[#ffe9e9]/10"
          >
            {banner.imageUrl && (
              <div className="absolute inset-0 -z-10 opacity-15 dark:opacity-20 pointer-events-none">
                <img src={banner.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-3 text-center md:text-left min-w-0">
              {banner.badgeText && (
                <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-[#ba0034] text-white">
                  {banner.badgeText}
                </span>
              )}
              {banner.subtitle && (
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#ba0034] dark:text-rose-400">
                  {banner.subtitle}
                </p>
              )}
              <h3 className="font-black text-xl sm:text-2xl text-[#281718] dark:text-white leading-tight">
                {banner.title}
              </h3>
              <p className="text-xs text-[#5d3f40] dark:text-zinc-300 max-w-xl">
                {banner.description}
              </p>
            </div>
            {banner.ctaText && (
              <PillButton
                variant="secondary"
                onClick={() => navigate(banner.ctaLink || '/listener/spatial-calibrator')}
                className="whitespace-nowrap cursor-pointer flex-shrink-0"
              >
                {banner.ctaText}
              </PillButton>
            )}
          </div>
        ))}
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
