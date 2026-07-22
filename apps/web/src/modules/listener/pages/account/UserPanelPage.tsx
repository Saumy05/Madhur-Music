import React from 'react';
import { useNavigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';
import { useAuthStore } from '@/shared/auth/useAuthStore';

export const UserPanelPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          Listener Account Hub
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
          User Account & Control Panel
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Manage your personal listening profile, VIP subscription, offline vault, and connected devices.
        </p>
      </div>

      {/* User Status Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
            alt="User avatar"
            className="w-16 h-16 rounded-full border-2 border-[#ba0034] object-cover"
          />
          <div>
            <h3 className="font-bold text-lg text-[#281718] dark:text-white">
              {user?.name || 'Saumya Tiwari'}
            </h3>
            <p className="text-xs text-[#5d3f40]">Plan: {user?.subscriptionPlan || 'Backstage VIP Individual ($9.99/mo)'}</p>
            <span className="text-[10px] font-semibold text-emerald-600">Active Membership</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <PillButton variant="primary" size="sm" onClick={() => navigate('/user-profile')}>
            Edit Profile
          </PillButton>
          <PillButton variant="secondary" size="sm" onClick={() => navigate('/pricing')}>
            Manage Subscription
          </PillButton>
        </div>
      </div>


      {/* User Quick Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Offline Downloads Vault', desc: '18 FLAC tracks saved for offline listening.', path: '/downloads', icon: 'download_for_offline' },
          { title: 'Connected Devices (Connect)', desc: 'Handoff playback between phone, Mac & Sonos.', path: '/devices', icon: 'devices' },
          { title: 'Listening Insights 2026', desc: '14,820 minutes streamed. View top genres.', path: '/listening-insights', icon: 'insights' },
          { title: 'Family Sharing Plan', desc: 'Manage family members under shared subscription.', path: '/family-sharing', icon: 'family_history' },
          { title: 'Equalizer & Hardware Presets', desc: 'Custom EQ profiles tuned for your headphones.', path: '/equalizer-presets', icon: 'tune' },
          { title: 'VIP Backstage Rewards', desc: '9,840 Points available to redeem for perks.', path: '/vip-rewards', icon: 'redeem' },
          { title: 'Smart Sleep & Alarm', desc: 'Configure automatic sleep timer and morning alarm.', path: '/sleep-timer', icon: 'bedtime' },
          { title: 'Encrypted Vault Storage', desc: 'AES-256 local encrypted audio storage.', path: '/offline-vault', icon: 'lock' },
          { title: 'Audio Stream Memory Cache', desc: 'Manage 1.2 GB pre-buffered audio stream cache.', path: '/audio-cache', icon: 'memory' },
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
