import React from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore, getRoleHomePath } from '@/shared/auth/useAuthStore';
import { PillButton } from '@/components/ui/PillButton';
import { Logo } from '@/components/common/Logo';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleGetStarted = () => {
    if (user?.role && user.role !== 'USER' && user.role !== 'LISTENER') {
      navigate(getRoleHomePath(user.role));
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto py-12 text-center flex flex-col items-center">
      <Logo size={64} showText={false} />
      <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
        Welcome to Madhur
      </h1>
      <p className="text-xs sm:text-sm text-[#5d3f40] dark:text-zinc-400">
        The premier high-utility music streaming platform for audiophiles.
      </p>
      <div className="flex justify-center gap-3">
        <PillButton variant="primary" glow onClick={handleGetStarted}>
          Get Started
        </PillButton>
      </div>
    </div>
  );
};

