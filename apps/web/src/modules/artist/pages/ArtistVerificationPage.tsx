import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const ArtistVerificationPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white flex items-center gap-2">
          Artist Blue Checkmark Verification
          <span className="material-symbols-outlined text-blue-500 text-2xl">verified</span>
        </h1>
        <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
          Verify your official identity to get the blue checkmark, custom profile URL, priority support & pitch to playlist editors.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-5">
        <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">check_circle</span>
          <div>
            <p className="font-extrabold">Verified Artist Status Active</p>
            <p className="text-[11px] font-semibold opacity-90">Identity verified via Apex Music Group Label Master Agreement.</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <h3 className="font-extrabold text-sm text-[#281718] dark:text-white">Verification Perks Unlocked</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 font-bold text-[#ba0034]">
              ✓ Official Blue Checkmark
            </div>
            <div className="p-3 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 font-bold text-[#ba0034]">
              ✓ Editorial Playlist Pitching
            </div>
            <div className="p-3 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 font-bold text-[#ba0034]">
              ✓ Real-Time Stream Telemetry
            </div>
            <div className="p-3 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 font-bold text-[#ba0034]">
              ✓ Custom Tour & Ticket Hub
            </div>
          </div>
        </div>

        <PillButton variant="secondary" className="w-full">
          Update Legal Government Documents
        </PillButton>
      </div>
    </div>
  );
};
