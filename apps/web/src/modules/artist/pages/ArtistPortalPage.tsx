import React from 'react';
import { useNavigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';

export const ArtistPortalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ba0034] text-white">
            Role Portal • Recording Artist
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-1">
            Artist & Creator Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#5d3f40]">
            Master uploads, real-time streaming analytics, pre-save campaigns, and royalty split contracts.
          </p>
        </div>
        <PillButton variant="primary" glow onClick={() => navigate('/creator-studio')}>
          Upload Master Audio Track
        </PillButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Monthly Streams</p>
          <p className="font-extrabold text-2xl text-[#ba0034] mt-1">1.28M</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ +14.2%</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Accrued Royalties</p>
          <p className="font-extrabold text-2xl text-[#8d2ebc] mt-1">$14,280</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Payout Date: Aug 1</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Pre-saves Active</p>
          <p className="font-extrabold text-2xl text-[#00694b] mt-1">4,890</p>
          <span className="text-[11px] text-[#5d3f40]">Vinyl Pre-order Campaign</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Fan Club Members</p>
          <p className="font-extrabold text-2xl text-[#ba0034] mt-1">12,450</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Top Tier Fans</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Artist Dashboard & Insights', path: '/artist/dashboard', icon: 'dashboard', desc: 'Demographics, geographic heatmaps, and top tracks.' },
          { title: 'Royalty Splits & Financials', path: '/artist/finances', icon: 'account_balance', desc: 'Smart contract payouts for producers & songwriters.' },
          { title: 'Marketing & Pre-save Suite', path: '/artist/marketing', icon: 'campaign', desc: 'Create pre-save links and Backstage drops.' },
          { title: 'Merch & Vinyl Store Control', path: '/artist/merch', icon: 'shopping_bag', desc: 'Manage inventory for vinyls and limited apparel.' },
          { title: 'Multitrack Raw Stems Studio', path: '/audio-stems-studio', icon: 'instant_mix', desc: 'Isolate Vocals, Drums, and Guitars for remixes.' },
          { title: 'Press & Newsroom Desk', path: '/artist/newsroom', icon: 'newspaper', desc: 'Publish tour press releases and media kits.' },
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
