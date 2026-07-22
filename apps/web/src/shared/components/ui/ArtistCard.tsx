import React from 'react';

interface ArtistCardProps {
  name: string;
  avatarUrl: string;
  monthlyListeners?: string;
  onClick?: () => void;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
  avatarUrl,
  monthlyListeners,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col items-center p-4 glass-panel rounded-2xl border border-white/40 artist-glow cursor-pointer transition-transform duration-300 hover:-translate-y-1 text-center"
    >
      <div className="relative w-28 h-28 rounded-full overflow-hidden mb-3 border-2 border-[#ba0034]/20 group-hover:border-[#ba0034] transition-colors">
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h4 className="font-semibold text-sm text-[#281718] dark:text-white truncate w-full">
        {name}
      </h4>
      {monthlyListeners && (
        <p className="text-xs text-[#5d3f40] truncate mt-0.5">
          {monthlyListeners} listeners
        </p>
      )}
    </div>
  );
};
