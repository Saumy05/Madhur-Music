import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const LabelRoyaltiesRevenuePage: React.FC = () => {
  const payouts = [
    { period: '2026 Q2 Interim', gross: '$189,400', labelShare: '$75,760', artistShare: '$113,640', status: 'Processing Payouts' },
    { period: '2026 Q1 Final', gross: '$240,100', labelShare: '$96,040', artistShare: '$144,060', status: 'Disbursed' },
    { period: '2025 Q4 Final', gross: '$310,800', labelShare: '$124,320', artistShare: '$186,480', status: 'Disbursed' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Label Royalties & Financial Payouts
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Stream calculations, sync placements, physical merchandise revenues, and automated artist statement generator.
          </p>
        </div>

        <PillButton variant="primary" glow>
          <span className="material-symbols-outlined text-lg">payments</span>
          <span>Initiate Batch Payouts</span>
        </PillButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-white/40 space-y-2">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">Total Gross Collections (YTD)</p>
          <h3 className="text-2xl font-extrabold text-[#281718] dark:text-white">$740,300</h3>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+14.2% YoY Growth</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-white/40 space-y-2">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">Label Net Share</p>
          <h3 className="text-2xl font-extrabold text-[#ba0034]">$296,120</h3>
          <span className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400">40% Average Net Retention</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-white/40 space-y-2">
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">Artist Pool Disbursed</p>
          <h3 className="text-2xl font-extrabold text-[#8d2ebc]">$444,180</h3>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">100% Recouped Roster Paid</span>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <h2 className="text-lg font-extrabold text-[#281718] dark:text-white">Quarterly Royalty Statements</h2>
        <div className="space-y-3">
          {payouts.map((p) => (
            <div key={p.period} className="p-4 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-sm text-[#281718] dark:text-white">{p.period} Statement</h4>
                <p className="text-xs text-[#5d3f40] dark:text-zinc-400">Gross: {p.gross} | Label: {p.labelShare} | Artists: {p.artistShare}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  p.status === 'Disbursed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}>
                  {p.status}
                </span>

                <button className="px-3 py-1.5 rounded-xl bg-[#ba0034] text-white font-bold text-xs hover:bg-[#a0002d] transition-all cursor-pointer">
                  Export CSV
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
