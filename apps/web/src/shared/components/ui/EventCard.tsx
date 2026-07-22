import React from 'react';

interface EventCardProps {
  artistName: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  imageUrl: string;
  ticketPrice: string;
  status: 'UPCOMING' | 'SELLING_FAST' | 'SOLD_OUT';
  onGetTickets?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  artistName,
  venue,
  city,
  date,
  time,
  imageUrl,
  ticketPrice,
  status,
  onGetTickets,
}) => {
  return (
    <div className="glass-panel p-4 rounded-2xl border border-white/40 artist-glow flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative w-full sm:w-40 aspect-video sm:aspect-square rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={artistName}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-white backdrop-blur-md">
          {date}
        </span>
      </div>

      <div className="flex-1 min-w-0 text-center sm:text-left">
        <span className="text-[11px] font-bold text-[#ba0034] uppercase tracking-widest">
          {city} • {time}
        </span>
        <h4 className="font-bold text-base text-[#281718] dark:text-white truncate mt-0.5">
          {artistName}
        </h4>
        <p className="text-xs text-[#5d3f40] truncate mt-0.5">{venue}</p>
        <p className="text-xs font-semibold text-[#8d2ebc] mt-2">{ticketPrice}</p>
      </div>

      <div className="flex-shrink-0 w-full sm:w-auto">
        <button
          onClick={onGetTickets}
          disabled={status === 'SOLD_OUT'}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
            status === 'SOLD_OUT'
              ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              : status === 'SELLING_FAST'
              ? 'premium-gradient text-white glow-button'
              : 'bg-[#ffe9e9] text-[#ba0034] hover:bg-[#ba0034] hover:text-white'
          }`}
        >
          {status === 'SOLD_OUT' ? 'Sold Out' : 'Get Tickets'}
        </button>
      </div>
    </div>
  );
};
