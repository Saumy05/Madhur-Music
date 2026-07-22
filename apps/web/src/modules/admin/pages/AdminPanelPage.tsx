import React from 'react';
import { useNavigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';

export const AdminPanelPage: React.FC = () => {
  const navigate = useNavigate();

  const adminModules = [
    { title: 'User Account Management', desc: 'Audit, modify, or suspend platform user profiles.', path: '/admin/users', icon: 'manage_accounts' },
    { title: 'Song Catalog Management', desc: 'Add direct audio streams, register YouTube music URLs, and configure metadata.', path: '/admin/songs', icon: 'music_note' },
    { title: 'Artist & Creator Registry', desc: 'Overlook registered musicians, stream counts, and releases.', path: '/admin/artists', icon: 'person_stars' },
    { title: 'Subscription Billing Tiers', desc: 'Configure monthly MRR tiers, VIP passes, and payment gateways.', path: '/admin/subscriptions', icon: 'subscriptions' },
    { title: 'RBAC Access Permissions', desc: 'Modify roles matrix, grant security keys, and govern actions.', path: '/admin/permissions', icon: 'vpn_key' },
    { title: 'Compliance & Audit Logs', desc: 'Review immutable SOC2 server audit trails and feature flags.', path: '/admin/audit-logs', icon: 'history' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ba0034] text-white">
          Admin Operations Console
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
          Madhur System Admin Panel
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40] dark:text-zinc-400">
          Platform administration, catalog audits, subscription plans, and immutable security trails.
        </p>
      </div>

      {/* Admin Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Active VIP Users</p>
          <p className="font-extrabold text-2xl text-[#ba0034] mt-1">142,890</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ +12% this week</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Pending Artist Verifications</p>
          <p className="font-extrabold text-2xl text-[#8d2ebc] mt-1">18</p>
          <span className="text-[11px] text-amber-600 font-semibold">Action Required</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Monthly Payout Pool</p>
          <p className="font-extrabold text-2xl text-[#00694b] mt-1">$2.84M</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Scheduled for 1st</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">System Health</p>
          <p className="font-extrabold text-2xl text-emerald-600 mt-1">99.99%</p>
          <span className="text-[11px] text-emerald-600 font-semibold">All Services Normal</span>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminModules.map((item) => (
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
            <p className="text-xs text-[#5d3f40] dark:text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
