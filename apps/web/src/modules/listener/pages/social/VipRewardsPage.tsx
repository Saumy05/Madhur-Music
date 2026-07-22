import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const VipRewardsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          VIP Rewards Store & Perks
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Redeem your Backstage Points for limited vinyl drops, concert tickets, and meeting artists.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-[#281718] dark:text-white">
              Backstage Point Balance
            </h3>
            <p className="text-xs text-[#5d3f40]">Earned through streaming & quizzes</p>
          </div>
          <span className="font-extrabold text-3xl text-[#ba0034]">9,840 Pts</span>
        </div>
        <PillButton variant="primary" glow className="w-full">
          Redeem Free Concert Ticket Pass
        </PillButton>
      </div>
    </div>
  );
};
