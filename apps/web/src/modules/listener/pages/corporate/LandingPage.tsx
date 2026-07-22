import React from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore, getRoleHomePath } from '@/shared/auth/useAuthStore';
import { PillButton } from '@/components/ui/PillButton';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const handleCtaClick = () => {
    if (isAuthenticated && user?.role) {
      navigate(getRoleHomePath(user.role));
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="space-y-16 py-8 max-w-6xl mx-auto text-center">
      {/* Hero Header */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          The Next Generation Music Streaming Experience
        </span>
        <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tight text-[#281718] dark:text-white leading-tight">
          Madhur – Melodic Music Experience
        </h1>
        <p className="text-base sm:text-lg text-[#5d3f40] dark:text-zinc-300">
          Immerse yourself in 24-bit 192kHz Spatial Audio, exclusive unreleased artist demos, live jam rooms, and tactile glassmorphic design.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <PillButton
            variant="primary"
            size="lg"
            glow
            onClick={handleCtaClick}
          >
            {isAuthenticated ? 'Go to Your Dashboard' : 'Start Listening Now'}
          </PillButton>
          <PillButton
            variant="ghost"
            size="lg"
            onClick={() => navigate('/style-guide')}
          >
            Explore Design Tokens
          </PillButton>
        </div>
      </div>


      {/* Hero Showcase Graphic */}
      <div className="relative w-full h-[450px] rounded-3xl overflow-hidden glass-panel border border-white/40 artist-glow">
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80"
          alt="Madhur Platform Showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 text-white text-left">
          <div>
            <h3 className="font-extrabold text-2xl">Soulful Acoustic Staging</h3>
            <p className="text-sm text-white/80">
              Designed for modern audiophiles seeking uncompromised clarity and high-utility warmth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
