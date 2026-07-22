import React from 'react';
import { useParams } from 'react-router';
import { MOCK_TRACKS } from '@/data/mockData';
import { TrackRow } from '@/components/ui/TrackRow';

export const GenrePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const genreTitle = slug ? decodeURIComponent(slug) : 'Genre Showcase';

  return (
    <div className="space-y-8">
      <div className="relative w-full h-56 rounded-3xl overflow-hidden premium-gradient p-8 flex flex-col justify-end text-white artist-glow">
        <span className="text-xs font-bold uppercase tracking-widest text-white/80">
          Genre Hub
        </span>
        <h1 className="font-extrabold text-3xl sm:text-5xl mt-1">{genreTitle}</h1>
        <p className="text-sm text-white/80 mt-2">
          Curated tracks, live stems, and spatial audio mixes in {genreTitle}.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-xl text-[#281718] dark:text-white">
          Top Tracks in {genreTitle}
        </h2>
        {MOCK_TRACKS.map((track, idx) => (
          <TrackRow key={track.id} track={track} index={idx} />
        ))}
      </div>
    </div>
  );
};
