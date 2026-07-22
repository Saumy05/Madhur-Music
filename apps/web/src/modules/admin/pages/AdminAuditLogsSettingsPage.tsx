import React from 'react';

export const AdminAuditLogsSettingsPage: React.FC = () => {
  const auditLogs = [
    { timestamp: '2026-07-21 18:45:10', actor: 'saumya@example.com (Admin)', action: 'Updated RBAC Role Policy for Music Label', ip: '192.168.1.45' },
    { timestamp: '2026-07-21 17:20:04', actor: 'mod@madhur.com (Moderator)', action: 'Issued DMCA Takedown on Track #FLAG-8891', ip: '10.0.4.12' },
    { timestamp: '2026-07-21 15:10:33', actor: 'exec@apexmusic.com (Label)', action: 'Exported Q2 Royalty Statements Batch CSV', ip: '172.16.8.99' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
          System Audit Logs & Security Compliance
        </h1>
        <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
          SOC2 immutable activity trails, administrator key rotations, system feature flags & global settings.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <h2 className="text-lg font-extrabold text-[#281718] dark:text-white">Real-Time Immutable Audit Log Trail</h2>
        <div className="space-y-3 font-mono text-xs">
          {auditLogs.map((log, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 space-y-1">
              <div className="flex justify-between text-[11px] text-[#ba0034] font-bold">
                <span>{log.timestamp}</span>
                <span>IP: {log.ip}</span>
              </div>
              <p className="text-[#281718] dark:text-zinc-200 font-sans font-semibold">{log.action}</p>
              <p className="text-[10px] text-[#5d3f40] dark:text-zinc-400 font-sans">Actor: {log.actor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
