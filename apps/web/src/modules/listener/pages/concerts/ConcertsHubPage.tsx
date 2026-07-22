import React from 'react';
import { useNavigate } from 'react-router';
import { MOCK_CONCERTS } from '@/data/mockData';
import { EventCard } from '@/components/ui/EventCard';
import { PillButton } from '@/components/ui/PillButton';

export const ConcertsHubPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
            Live Concerts & Festivals
          </h1>
          <p className="text-xs sm:text-sm text-[#5d3f40]">
            Discover nearby tours, buy tickets, and stream live interactive events.
          </p>
        </div>
        <PillButton variant="primary" onClick={() => navigate('/concerts/map')}>
          <span className="material-symbols-outlined text-lg">map</span>
          Open Concert Map
        </PillButton>
      </div>

      <div className="space-y-4">
        {MOCK_CONCERTS.map((concert) => (
          <EventCard
            key={concert.id}
            artistName={concert.artistName}
            venue={concert.venue}
            city={concert.city}
            date={concert.date}
            time={concert.time}
            imageUrl={concert.imageUrl}
            ticketPrice={concert.ticketPrice}
            status={concert.status}
            onGetTickets={() => navigate(`/concerts/live/${concert.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
