import React from 'react';
import { PillButton } from '@/components/ui/PillButton';
import { useAuthStore } from '@/shared/auth/useAuthStore';

export const UserProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="glass-panel p-8 rounded-3xl border border-white/40 artist-glow flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
          alt="User Profile"
          className="w-28 h-28 rounded-full border-4 border-[#ba0034] object-cover"
        />
        <div className="text-center sm:text-left space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
            {user?.subscriptionPlan || 'VIP Member'}
          </span>
          <h1 className="font-extrabold text-3xl text-[#281718] dark:text-white">
            {user?.name || 'Saumya Tiwari'}
          </h1>
          <p className="text-xs text-[#5d3f40]">
            {user?.email || 'saumya@example.com'} • {user?.role || 'Listener'} Portal
          </p>
          <div className="pt-2 flex justify-center sm:justify-start gap-3">
            <PillButton variant="primary" size="sm">
              Edit Profile
            </PillButton>
            <PillButton variant="secondary" size="sm">
              Account Settings
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  );
};

