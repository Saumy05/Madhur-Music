import React from 'react';

export const AdminRolesPermissionsPage: React.FC = () => {
  const rolesMatrix = [
    { role: 'Listener', scope: 'Public player, playlists, social jam, downloads, VIP pass' },
    { role: 'Artist', scope: 'Upload audio, multitrack stems, royalty splits, merch, tour events' },
    { role: 'Music Label', scope: 'Catalog master distribution, DDEX, artist contracts, royalty payouts' },
    { role: 'Podcast Host', scope: 'Publish episodes, RSS feeds, sponsor ads, listener analytics' },
    { role: 'Event Promoter', scope: 'Box office tickets, venue maps, presale campaigns, tour schedules' },
    { role: 'Moderator', scope: 'Content flags, DMCA takedowns, artist verification blue checks' },
    { role: 'Administrator', scope: 'Full system RBAC access, telemetry, billing, feature flags, audit logs' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
          System Roles & RBAC Permission Matrix
        </h1>
        <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
          Role-Based Access Control (RBAC) security matrix defining route permissions across all 7 platform user roles.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <div className="space-y-3">
          {rolesMatrix.map((r) => (
            <div key={r.role} className="p-4 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#ba0034] text-white font-extrabold text-xs">{r.role}</span>
                <p className="font-semibold text-[#281718] dark:text-zinc-200 mt-2">{r.scope}</p>
              </div>
              <button className="px-3 py-1.5 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-[#ba0034] font-bold text-xs hover:bg-[#ba0034] hover:text-white transition-all cursor-pointer self-start sm:self-auto">
                Configure Claims
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
