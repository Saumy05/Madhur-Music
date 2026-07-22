import React from 'react';
import { useNavigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';
import { useAuthStore } from '@/shared/auth/useAuthStore';

export const ListenerPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
            Role Portal • Listener
          </span>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-1">
            Listener & Fan Experience Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#5d3f40]">
            Your central hub for audio streaming, offline downloads, VIP perks, and social jam rooms.
          </p>
        </div>
        <PillButton variant="primary" glow onClick={() => navigate('/library')}>
          Open Your Music Library
        </PillButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">VIP Subscription</p>
          <p className="font-extrabold text-xl text-[#ba0034] mt-1">
            {user?.subscriptionPlan ? user.subscriptionPlan.replace('_', ' ') : 'Backstage VIP'}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">Active • 24-bit 192kHz Spatial</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Fan Club Points</p>
          <p className="font-extrabold text-xl text-[#8d2ebc] mt-1">9,840 Points</p>
          <span className="text-[11px] text-[#ba0034] font-semibold">Ready for Concert Ticket Drop</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow">
          <p className="text-xs font-bold text-[#5d3f40] uppercase">Offline Storage</p>
          <p className="font-extrabold text-xl text-[#00694b] mt-1">18 Lossless Tracks</p>
          <span className="text-[11px] text-[#5d3f40]">4.2 GB of 32 GB used</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Audio Lab & EQ', path: '/audio-lab', icon: 'graphic_eq' },
          { title: 'Focus Mode (432Hz)', path: '/focus-mode', icon: 'center_focus_strong' },
          { title: 'Live Jam Rooms', path: '/social/jam', icon: 'groups' },
          { title: 'Encrypted Vault', path: '/offline-vault', icon: 'lock' },
        ].map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="glass-panel p-5 rounded-2xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all space-y-2 text-center"
          >
            <span className="material-symbols-outlined text-3xl text-[#ba0034]">
              {item.icon}
            </span>
            <h4 className="font-bold text-xs text-[#281718] dark:text-white">
              {item.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
