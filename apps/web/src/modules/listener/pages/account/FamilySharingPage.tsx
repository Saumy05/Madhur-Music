import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const FamilySharingPage: React.FC = () => {
  const members = [
    { name: 'Saumya Tiwari (Owner)', role: 'Primary VIP Account' },
    { name: 'Ananya Tiwari', role: 'Family Member' },
    { name: 'Rohan Tiwari', role: 'Family Member' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Family Sharing & Member Management
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Manage up to 6 VIP accounts under your Family Pass subscription.
        </p>
      </div>

      <div className="space-y-3">
        {members.map((m, i) => (
          <div
            key={i}
            className="glass-panel p-4 rounded-2xl border border-white/40 artist-glow flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-sm text-[#281718] dark:text-white">
                {m.name}
              </h4>
              <p className="text-xs text-[#5d3f40]">{m.role}</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600">Active VIP</span>
          </div>
        ))}
      </div>

      <PillButton variant="primary" glow className="mx-auto">
        Invite Family Member
      </PillButton>
    </div>
  );
};
