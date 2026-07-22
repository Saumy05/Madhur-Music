import React from 'react';
import { useNavigate } from 'react-router';
import { MOCK_PODCASTS, MOCK_PODCAST_EPISODES } from '@/data/mockData';
import { PodcastCard } from '@/components/ui/PodcastCard';
import { PillButton } from '@/components/ui/PillButton';

export const PodcastsHubPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
            Podcasts & Talk Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#5d3f40]">
            Stories, music deep-dives, and exclusive creator studio podcasts.
          </p>
        </div>
        <PillButton variant="primary" onClick={() => navigate('/podcasts/studio')}>
          <span className="material-symbols-outlined text-lg">mic</span>
          Creator Studio
        </PillButton>
      </div>

      {/* Featured Shows */}
      <section className="space-y-4">
        <h2 className="font-bold text-xl text-[#281718] dark:text-white">
          Featured Podcast Shows
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOCK_PODCASTS.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              title={podcast.title}
              host={podcast.host}
              coverUrl={podcast.coverUrl}
              category={podcast.category}
              episodesCount={podcast.episodesCount}
              onClick={() => navigate(`/podcasts/player/${podcast.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Recent Episodes List */}
      <section className="space-y-4">
        <h2 className="font-bold text-xl text-[#281718] dark:text-white">
          Latest Episodes
        </h2>
        <div className="space-y-3">
          {MOCK_PODCAST_EPISODES.map((ep) => (
            <div
              key={ep.id}
              onClick={() => navigate(`/podcasts/player/${ep.id}`)}
              className="glass-panel p-4 rounded-2xl border border-white/40 artist-glow flex items-center justify-between cursor-pointer hover:bg-[#ffe9e9]/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={ep.coverUrl}
                  alt={ep.title}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <span className="text-[10px] font-bold text-[#ba0034] uppercase tracking-wider">
                    {ep.podcastTitle} • {ep.publishedDate}
                  </span>
                  <h4 className="font-bold text-sm text-[#281718] dark:text-white mt-0.5">
                    {ep.title}
                  </h4>
                  <p className="text-xs text-[#5d3f40] line-clamp-1">
                    {ep.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#5d3f40]">
                  {ep.duration}
                </span>
                <div className="w-9 h-9 rounded-full premium-gradient flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xl">
                    play_arrow
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
