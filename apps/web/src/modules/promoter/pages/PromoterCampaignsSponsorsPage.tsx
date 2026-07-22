import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const PromoterCampaignsSponsorsPage: React.FC = () => {
  const campaigns = [
    { title: 'MSG Tour Presale Push', platform: 'Instagram & TikTok', spend: '$14,500', ROI: '12.4x', status: 'Active' },
    { title: 'LA Forum Early Bird Blast', platform: 'Madhur Push Notifications', spend: '$5,000', ROI: '28.1x', status: 'Completed' },
    { title: 'Royal Albert Hall Billboard', platform: 'London OOH & Radio', spend: '$22,000', ROI: '8.9x', status: 'Active' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Promoter Marketing & Ad Campaigns
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Push presale codes, target geo-fenced fans, track conversion pixel ROAS & event sponsor branding.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">campaign</span>
          <span>Launch Fan Presale Campaign</span>
        </PillButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {campaigns.map((c) => (
          <div key={c.title} className="glass-panel p-6 rounded-3xl border border-white/40 space-y-3">
            <span className="text-[10px] font-bold text-[#ba0034] uppercase tracking-wider">{c.platform}</span>
            <h3 className="font-extrabold text-base text-[#281718] dark:text-white">{c.title}</h3>

            <div className="flex justify-between text-xs py-2 border-y border-[#e6bcbd]/40 dark:border-white/10">
              <span className="text-[#5d3f40] dark:text-zinc-400">Budget Spent: <strong>{c.spend}</strong></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">ROAS: {c.ROI}</span>
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'
              }`}>
                {c.status}
              </span>
              <button className="text-xs font-bold text-[#ba0034] hover:underline cursor-pointer">
                Campaign Metrics →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
