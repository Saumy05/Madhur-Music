import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const ModeratorDashboardPage: React.FC = () => {
  const stats = [
    { label: 'Pending Reported Songs', value: '14 Items', urgency: 'High Priority', icon: 'report_problem' },
    { label: 'Active Copyright Takedowns', value: '6 Claims', urgency: 'DMCA 24h Queue', icon: 'copyright' },
    { label: 'Artist Verification Requests', value: '28 Apps', urgency: 'Normal Queue', icon: 'verified_user' },
    { label: 'User Community Flags', value: '42 Flags', urgency: 'Low Risk', icon: 'flag' },
  ];

  const urgentQueue = [
    { id: 'FLAG-8891', type: 'Unlicensed Sample Violation', target: 'Track: "Cyber City Vibe" by CyberDJ', reporter: 'Sony Music Legal', status: 'Pending Review' },
    { id: 'VER-4402', type: 'Blue Check Verification', target: 'Artist: "Nova Star" (1.2M Spotify)', reporter: 'Self Application', status: 'Pending Review' },
    { id: 'POD-1029', type: 'Hate Speech Content Flag', target: 'Podcast Ep #14: "Unfiltered Talk"', reporter: 'Community Flag (18 users)', status: 'Urgent Audit' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#ba0034]/10 text-[#ba0034] text-xs font-bold uppercase tracking-wider">
              Trust & Safety Moderation
            </span>
            <span className="px-3 py-1 rounded-full bg-[#8d2ebc]/10 text-[#8d2ebc] text-xs font-bold">
              Compliance Enforcement
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#281718] dark:text-white">
            Moderator Command Dashboard
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-300 mt-1">
            Review community flags, DMCA copyright takedown notices, illegal sample claims & artist verification requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PillButton variant="primary" glow>
            <span className="material-symbols-outlined text-lg">rule</span>
            <span>Batch Review Queue</span>
          </PillButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-panel p-5 rounded-3xl border border-white/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034]">
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
              </span>
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                {s.urgency}
              </span>
            </div>
            <div>
              <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">{s.label}</p>
              <h3 className="text-2xl font-extrabold text-[#281718] dark:text-white">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <h2 className="text-lg font-extrabold text-[#281718] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ba0034]">rule</span>
          High Priority Moderation Queue
        </h2>

        <div className="space-y-3">
          {urgentQueue.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#ba0034] uppercase">{item.id} • {item.type}</span>
                <h3 className="font-extrabold text-sm text-[#281718] dark:text-white">{item.target}</h3>
                <p className="text-xs text-[#5d3f40] dark:text-zinc-400">Filed By: {item.reporter}</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all cursor-pointer">
                  Approve / Clear
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-[#ba0034] text-white font-bold text-xs hover:bg-[#a0002d] transition-all cursor-pointer">
                  Takedown / Block
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
