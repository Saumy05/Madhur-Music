import React, { useState } from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const LabelArtistsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const artists = [
    { id: '1', name: 'Aria Vance', genre: 'Synth Pop', releases: 4, monthlyListeners: '3.4M', status: 'Active Contract', split: '70 / 30' },
    { id: '2', name: 'Cosmic Pulse', genre: 'Electronic / Ambient', releases: 6, monthlyListeners: '1.9M', status: 'Active Contract', split: '65 / 35' },
    { id: '3', name: 'Devon Noir', genre: 'R&B / Soul', releases: 2, monthlyListeners: '890K', status: 'Under Option', split: '60 / 40' },
    { id: '4', name: 'Luna Sterling', genre: 'Indie Rock', releases: 3, monthlyListeners: '1.2M', status: 'Active Contract', split: '75 / 25' },
  ];

  const filtered = artists.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.genre.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Managed Label Roster
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            View signed talent, deal parameters, contract terms, and master royalty share allocations.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">person_add</span>
          <span>Sign New Artist</span>
        </PillButton>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-white/40 flex items-center gap-3">
        <span className="material-symbols-outlined text-[#ba0034]">search</span>
        <input
          type="text"
          placeholder="Search roster by artist name, genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-xs font-semibold text-[#281718] dark:text-white focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((artist) => (
          <div key={artist.id} className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4 hover:border-[#ba0034]/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full premium-gradient flex items-center justify-center text-white font-extrabold text-lg">
                  {artist.name[0]}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#281718] dark:text-white">{artist.name}</h3>
                  <p className="text-xs text-[#5d3f40] dark:text-zinc-400">{artist.genre}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                {artist.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#e6bcbd]/40 dark:border-white/10 text-center">
              <div>
                <p className="text-[10px] text-[#5d3f40] dark:text-zinc-400 font-semibold uppercase">Releases</p>
                <p className="font-extrabold text-sm text-[#281718] dark:text-white">{artist.releases}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#5d3f40] dark:text-zinc-400 font-semibold uppercase">Monthly</p>
                <p className="font-extrabold text-sm text-[#ba0034]">{artist.monthlyListeners}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#5d3f40] dark:text-zinc-400 font-semibold uppercase">Royalty Split</p>
                <p className="font-extrabold text-sm text-[#8d2ebc]">{artist.split}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] font-bold text-xs hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer">
                View Contract & Advances
              </button>
              <button className="px-3 py-2 rounded-xl border border-[#e6bcbd]/40 text-[#281718] dark:text-white font-bold text-xs hover:bg-[#ffe9e9] transition-all cursor-pointer">
                Statements
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
