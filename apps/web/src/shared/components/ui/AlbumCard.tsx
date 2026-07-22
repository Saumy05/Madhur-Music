import React from 'react';

interface AlbumCardProps {
  title: string;
  artist: string;
  coverUrl: string;
  subtitle?: string;
  onClick?: () => void;
  onPlayClick?: () => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({
  title,
  artist,
  coverUrl,
  subtitle,
  onClick,
  onPlayClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex-shrink-0 w-44 sm:w-52 glass-panel p-3 rounded-2xl border border-white/40 artist-glow cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlayClick?.();
          }}
          className="absolute bottom-3 right-3 w-10 h-10 premium-gradient rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 active:scale-90"
        >
          <span className="material-symbols-outlined text-xl">play_arrow</span>
        </button>
      </div>

      <h4 className="font-semibold text-sm text-[#281718] dark:text-white truncate">
        {title}
      </h4>
      <p className="text-xs text-[#5d3f40] truncate mt-0.5">
        {subtitle || artist}
      </p>
    </div>
  );
};
