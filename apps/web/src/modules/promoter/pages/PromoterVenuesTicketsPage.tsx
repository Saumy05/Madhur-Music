import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const PromoterVenuesTicketsPage: React.FC = () => {
  const venues = [
    { name: 'Madison Square Garden', city: 'New York, NY', capacity: 20000, activeTiers: 'VIP Pit, Orchestra, Mezzanine', status: 'Booked' },
    { name: 'The Forum', city: 'Los Angeles, CA', capacity: 17500, activeTiers: 'GA Floor, Lower Bowl, Suite', status: 'Booked' },
    { name: 'Royal Albert Hall', city: 'London, UK', capacity: 5272, activeTiers: 'Stalls, Circle, Gallery', status: 'Booked' },
    { name: 'Red Rocks Amphitheatre', city: 'Morrison, CO', capacity: 9525, activeTiers: 'Reserved Rows 1-25, GA', status: 'Holds Placed' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Venues & Ticket Inventory Tiers
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Configure dynamic tier pricing, VIP early entry passes, barcode NFC scanners & venue rental contracts.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">location_city</span>
          <span>Add Partner Venue</span>
        </PillButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {venues.map((v) => (
          <div key={v.name} className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-[#281718] dark:text-white">{v.name}</h3>
                <p className="text-xs text-[#5d3f40] dark:text-zinc-400">{v.city}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#8d2ebc]/10 text-[#8d2ebc] font-bold text-xs">
                Capacity: {v.capacity.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 text-xs space-y-1">
              <span className="text-[10px] font-bold text-[#ba0034] uppercase">Configured Seating Tiers</span>
              <p className="font-semibold text-[#281718] dark:text-zinc-200">{v.activeTiers}</p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] font-bold text-xs hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer">
                Edit Pricing & Allocation
              </button>
              <button className="px-3 py-2 rounded-xl border border-[#e6bcbd]/40 text-[#281718] dark:text-white font-bold text-xs hover:bg-[#ffe9e9] transition-all cursor-pointer">
                Venue Map
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
