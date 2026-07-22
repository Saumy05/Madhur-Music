import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore, getRoleHomePath } from '@/shared/auth/useAuthStore';
import { ChipFilter } from '@/components/ui/ChipFilter';
import { PillButton } from '@/components/ui/PillButton';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    'Indie Pop',
    'Spatial Audio',
  ]);

  const genres = [
    'Indie Pop',
    'Ambient Jazz',
    'Synthwave',
    'World Fusion',
    'Lo-Fi Beats',
    'Acoustic Demos',
    'Sufi Fusion',
    'Bollywood Retro',
  ];

  const toggleGenre = (g: string) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((i) => i !== g) : [...prev, g]
    );
  };

  const handleComplete = () => {
    if (user?.role) {
      navigate(getRoleHomePath(user.role));
    } else {
      navigate('/');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 space-y-8 text-center animate-in fade-in duration-200">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          Step 1 of 2
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
          Personalize Your Vibe
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Select 3 or more genres to train Madhur's recommendation engine.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 glass-panel p-8 rounded-3xl border border-white/40 artist-glow">
        {genres.map((g) => (
          <ChipFilter
            key={g}
            label={g}
            isActive={selectedGenres.includes(g)}
            onClick={() => toggleGenre(g)}
          />
        ))}
      </div>

      <PillButton
        variant="primary"
        glow
        className="mx-auto"
        onClick={handleComplete}
      >
        Complete Setup & Listen
      </PillButton>
    </div>
  );
};

