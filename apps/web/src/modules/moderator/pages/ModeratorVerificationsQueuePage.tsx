import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const ModeratorVerificationsQueuePage: React.FC = () => {
  const applicants = [
    { name: 'Kavya Music', role: 'Artist', link: 'spotify.com/artist/kavya', followers: '450K', status: 'Pending ID Verification' },
    { name: 'Echo Recordings', role: 'Music Label', link: 'echorecordings.com', artists: 8, status: 'Pending Business License' },
    { name: 'The Tech Frequency', role: 'Podcast Host', link: 'techfrequency.fm', downloads: '1.2M', status: 'Approved (Pending Badge)' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Artist & Label Blue Verification Queue
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Verify official artist identities, government passports, trademark ownership & grant blue checkmarks.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">verified</span>
          <span>Grant Official Verified Badge</span>
        </PillButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {applicants.map((a) => (
          <div key={a.name} className="glass-panel p-6 rounded-3xl border border-white/40 space-y-3">
            <span className="text-[10px] font-bold text-[#ba0034] uppercase tracking-wider">{a.role} Application</span>
            <h3 className="font-extrabold text-base text-[#281718] dark:text-white flex items-center gap-1.5">
              {a.name}
              <span className="material-symbols-outlined text-base text-blue-500">verified</span>
            </h3>

            <p className="text-xs text-[#5d3f40] dark:text-zinc-300">Link: {a.link}</p>
            <div className="p-2 rounded-xl bg-[#ffe9e9]/50 dark:bg-white/5 text-[11px] font-bold text-[#8d2ebc]">
              Status: {a.status}
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all cursor-pointer">
                Approve Badge
              </button>
              <button className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-600 font-bold text-xs hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
