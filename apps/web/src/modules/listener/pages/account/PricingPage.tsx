import React, { useState } from 'react';
import { useAuthStore, SubscriptionPlan } from '@/shared/auth/useAuthStore';
import { PillButton } from '@/components/ui/PillButton';

export const PricingPage: React.FC = () => {
  const { user, setSubscription } = useAuthStore();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubscribe = (plan: SubscriptionPlan, planName: string) => {
    setSubscription(plan);
    setFeedback(`Success! Your plan has been upgraded to ${planName}.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const currentPlan = user?.subscriptionPlan || 'FREE';

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-center animate-in fade-in duration-200">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          Backstage VIP Memberships
        </span>
        <h1 className="font-extrabold text-3xl sm:text-5xl text-[#281718] dark:text-white mt-2">
          Choose Your Music Plan
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40] max-w-lg mx-auto mt-1">
          Unlock 24-bit 192kHz Spatial Audio, unreleased artist snippets, stems, and zero ads.
        </p>
      </div>

      {feedback && (
        <div className="p-3 max-w-md mx-auto rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-xs animate-bounce">
          {feedback}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Free Plan */}
        <div className={`glass-panel p-6 rounded-3xl border artist-glow flex flex-col justify-between text-left space-y-4 ${
          currentPlan === 'FREE' ? 'border-[#ba0034]' : 'border-white/40'
        }`}>
          <div>
            <h3 className="font-bold text-xl text-[#281718] dark:text-white">
              Madhur Free
            </h3>
            <p className="font-extrabold text-3xl text-[#281718] dark:text-white mt-2">
              $0<span className="text-xs font-normal text-[#5d3f40]">/mo</span>
            </p>
            <ul className="text-xs text-[#5d3f40] space-y-2 mt-4">
              <li>✓ Standard 160kbps audio</li>
              <li>✓ Full public catalog access</li>
              <li>✓ Ad-supported playback</li>
            </ul>
          </div>
          {currentPlan === 'FREE' ? (
            <PillButton variant="secondary" className="w-full" disabled>
              Current Plan
            </PillButton>
          ) : (
            <PillButton variant="secondary" className="w-full" onClick={() => handleSubscribe('FREE', 'Madhur Free')}>
              Downgrade to Free
            </PillButton>
          )}
        </div>

        {/* VIP Individual */}
        <div className={`glass-panel p-6 rounded-3xl border-2 artist-glow flex flex-col justify-between text-left space-y-4 relative ${
          currentPlan === 'BACKSTAGE_VIP' ? 'border-[#ba0034] shadow-lg' : 'border-[#ba0034]/40'
        }`}>
          <span className="absolute -top-3 right-4 px-3 py-1 rounded-full text-[10px] font-bold bg-[#ba0034] text-white uppercase tracking-wider">
            Most Popular
          </span>
          <div>
            <h3 className="font-bold text-xl text-[#ba0034]">Backstage VIP</h3>
            <p className="font-extrabold text-3xl text-[#281718] dark:text-white mt-2">
              $9.99<span className="text-xs font-normal text-[#5d3f40]">/mo</span>
            </p>
            <ul className="text-xs text-[#281718] dark:text-white space-y-2 mt-4 font-semibold">
              <li>✓ 24-bit 192kHz Spatial Dolby Atmos</li>
              <li>✓ Unreleased artist snippets & stems</li>
              <li>✓ Offline listening downloads</li>
              <li>✓ Zero ads & unlimited skips</li>
            </ul>
          </div>
          {currentPlan === 'BACKSTAGE_VIP' ? (
            <PillButton variant="secondary" className="w-full" disabled>
              Current Plan
            </PillButton>
          ) : (
            <PillButton variant="primary" glow className="w-full" onClick={() => handleSubscribe('BACKSTAGE_VIP', 'Backstage VIP')}>
              Select Backstage VIP
            </PillButton>
          )}
        </div>

        {/* Family Pass */}
        <div className={`glass-panel p-6 rounded-3xl border artist-glow flex flex-col justify-between text-left space-y-4 ${
          currentPlan === 'PREMIUM' ? 'border-[#ba0034]' : 'border-white/40'
        }`}>
          <div>
            <h3 className="font-bold text-xl text-[#8d2ebc]">Family Pass</h3>
            <p className="font-extrabold text-3xl text-[#281718] dark:text-white mt-2">
              $14.99<span className="text-xs font-normal text-[#5d3f40]">/mo</span>
            </p>
            <ul className="text-xs text-[#5d3f40] space-y-2 mt-4">
              <li>✓ Up to 6 VIP accounts</li>
              <li>✓ Shared Family Jam Room</li>
              <li>✓ Individual personalized feeds</li>
            </ul>
          </div>
          {currentPlan === 'PREMIUM' ? (
            <PillButton variant="secondary" className="w-full" disabled>
              Current Plan
            </PillButton>
          ) : (
            <PillButton variant="secondary" className="w-full" onClick={() => handleSubscribe('PREMIUM', 'Family Pass')}>
              Upgrade Family
            </PillButton>
          )}
        </div>
      </div>
    </div>
  );
};

