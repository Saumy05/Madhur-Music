import React from 'react';
import { MOCK_PODCASTS } from '@/data/mockData';
import { PodcastCard } from '@/components/ui/PodcastCard';

export const PodcastSubscriptionsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Subscribed Podcast Shows
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Shows you follow with automatic background episode downloading.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_PODCASTS.map((podcast) => (
          <PodcastCard
            key={podcast.id}
            title={podcast.title}
            host={podcast.host}
            coverUrl={podcast.coverUrl}
            category={podcast.category}
            episodesCount={podcast.episodesCount}
          />
        ))}
      </div>
    </div>
  );
};
