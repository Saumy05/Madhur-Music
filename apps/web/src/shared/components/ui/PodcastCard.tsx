import React from 'react';

interface PodcastCardProps {
  title: string;
  host: string;
  coverUrl: string;
  category: string;
  episodesCount?: number;
  onClick?: () => void;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({
  title,
  host,
  coverUrl,
  category,
  episodesCount,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group glass-panel p-3.5 rounded-2xl border border-white/40 artist-glow cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
          {category}
        </span>
      </div>
      <h4 className="font-semibold text-sm text-[#281718] dark:text-white truncate">
        {title}
      </h4>
      <p className="text-xs text-[#5d3f40] truncate mt-0.5">
        Host: {host} {episodesCount && `• ${episodesCount} eps`}
      </p>
    </div>
  );
};
