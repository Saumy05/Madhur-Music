import React from 'react';

interface MerchCardProps {
  title: string;
  price: number;
  imageUrl: string;
  badge?: string;
  isSoldOut?: boolean;
  onAddToCart?: () => void;
}

export const MerchCard: React.FC<MerchCardProps> = ({
  title,
  price,
  imageUrl,
  badge,
  isSoldOut,
  onAddToCart,
}) => {
  return (
    <div className="flex-shrink-0 w-64 glass-panel overflow-hidden rounded-2xl border border-white/40 artist-glow flex flex-col">
      <div className="relative w-full aspect-[4/5] bg-[#ffe9e9] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              isSoldOut
                ? 'bg-[#ba0034] text-white'
                : 'bg-[#8d2ebc] text-white'
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h4 className="font-semibold text-sm text-[#281718] dark:text-white mb-2 line-clamp-1">
          {title}
        </h4>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-base font-bold text-[#ba0034]">
            ${price.toFixed(2)}
          </span>
          <button
            onClick={onAddToCart}
            disabled={isSoldOut}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
              isSoldOut
                ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                : 'bg-[#ffe9e9] text-[#ba0034] hover:bg-[#ba0034] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              shopping_bag
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
