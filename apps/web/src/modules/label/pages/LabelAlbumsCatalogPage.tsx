import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const LabelAlbumsCatalogPage: React.FC = () => {
  const catalog = [
    { upc: '886445901234', title: 'Velvet Horizon', type: 'Album', artist: 'Aria Vance', tracks: 12, isrcCount: 12, releaseDate: '2026-03-15', status: 'Delivered' },
    { upc: '886445901235', title: 'Neon Echoes', type: 'EP', artist: 'Cosmic Pulse', tracks: 5, isrcCount: 5, releaseDate: '2026-01-20', status: 'Delivered' },
    { upc: '886445901236', title: 'Midnight Serenade', type: 'Single', artist: 'Devon Noir', tracks: 1, isrcCount: 1, releaseDate: '2026-05-02', status: 'Pending QC' },
    { upc: '886445901237', title: 'Electric Reverie', type: 'Album', artist: 'Luna Sterling', tracks: 10, isrcCount: 10, releaseDate: '2026-06-11', status: 'Processing' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Master Audio Catalog & Releases
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Manage DDEX deliveries, ISRC metadata, lossless WAV master files & global DSP distribution.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">upload_file</span>
          <span>Ingest New Release</span>
        </PillButton>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e6bcbd]/40 dark:border-white/10 text-[#5d3f40] dark:text-zinc-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">UPC Code</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Artist</th>
                <th className="py-3 px-4">Tracks</th>
                <th className="py-3 px-4">Release Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6bcbd]/20 dark:divide-white/5 font-semibold text-[#281718] dark:text-zinc-200">
              {catalog.map((item) => (
                <tr key={item.upc} className="hover:bg-[#ffe9e9]/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#5d3f40] dark:text-zinc-400">{item.upc}</td>
                  <td className="py-3.5 px-4 font-bold text-[#ba0034]">{item.title}</td>
                  <td className="py-3.5 px-4">{item.type}</td>
                  <td className="py-3.5 px-4">{item.artist}</td>
                  <td className="py-3.5 px-4">{item.tracks} ISRCs</td>
                  <td className="py-3.5 px-4">{item.releaseDate}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'Delivered'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : item.status === 'Pending QC'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right flex justify-end gap-2">
                    <button className="p-1.5 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                    <button className="p-1.5 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-[#8d2ebc] hover:bg-[#8d2ebc] hover:text-white transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-base">share</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
