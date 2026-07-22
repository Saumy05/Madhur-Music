import React from 'react';
import { useNavigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';

export const AdminPortalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            Role Portal • System Admin
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-1">
            System Administration & Ops Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#5d3f40]">
            Global infrastructure monitoring, SOC2 security audits, DRM enforcement, and automated payouts.
          </p>
        </div>
        <PillButton variant="primary" glow onClick={() => navigate('/corporate/security')}>
          Inspect Security Audit Logs
        </PillButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Server Uptime</p>
          <p className="font-extrabold text-2xl text-emerald-600 mt-1">99.998%</p>
          <span className="text-[11px] text-emerald-600 font-semibold">12 Edge Regions Online</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Pending Takedowns</p>
          <p className="font-extrabold text-2xl text-[#ba0034] mt-1">0 Requests</p>
          <span className="text-[11px] text-emerald-600 font-semibold">DMCA Queue Clear</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Active Edge Nodes</p>
          <p className="font-extrabold text-2xl text-[#8d2ebc] mt-1">428 Nodes</p>
          <span className="text-[11px] text-[#5d3f40]">Lossless CDN Cache 94%</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Global Bandwidth</p>
          <p className="font-extrabold text-2xl text-[#00694b] mt-1">1.84 Tbps</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Peak Capacity Nominal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Admin Operations Console', path: '/admin', icon: 'admin_panel_settings', desc: 'Manage system settings, user roles, and platform flags.' },
          { title: 'Corporate Security & SOC2', path: '/corporate/security', icon: 'security', desc: 'AES-256 DRM watermarking, ISO compliance, and keys.' },
          { title: 'Corporate Finance Portal', path: '/corporate', icon: 'domain', desc: 'Quarterly financial statements and tax withholdings.' },
          { title: 'API & Developer Portal', path: '/developer', icon: 'code', desc: 'OAuth client apps, rate limits, and webhook webhooks.' },
          { title: 'Legal & Terms Center', path: '/legal', icon: 'gavel', desc: 'Copyright policy, licensing terms, and privacy rules.' },
          { title: 'App Store Feature Specs', path: '/app-store-preview', icon: 'store', desc: 'Manage mobile store promotional metadata.' },
        ].map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all space-y-2"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[#ba0034]">
                {item.icon}
              </span>
              <h4 className="font-bold text-sm text-[#281718] dark:text-white">
                {item.title}
              </h4>
            </div>
            <p className="text-xs text-[#5d3f40]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
