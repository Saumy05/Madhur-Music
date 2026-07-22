import React from 'react';
import { MADHUR_THEME } from '@/theme/tokens';
import { PillButton } from '@/components/ui/PillButton';

export const StyleGuidePage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          Design System & Brand Assets
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
          Madhur Brand Style Guide
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Vibrant Minimalist aesthetic tokens, glassmorphism specs, and typography.
        </p>
      </div>

      {/* Color Palette Spec */}
      <section className="space-y-4">
        <h2 className="font-bold text-xl text-[#281718] dark:text-white">
          Color Palette Tokens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#ba0034] text-white shadow-md">
            <p className="font-bold text-sm">Primary Pink/Red</p>
            <p className="text-xs opacity-90">#ba0034</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#8d2ebc] text-white shadow-md">
            <p className="font-bold text-sm">Secondary Purple</p>
            <p className="text-xs opacity-90">#8d2ebc</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#00694b] text-white shadow-md">
            <p className="font-bold text-sm">Tertiary Emerald</p>
            <p className="text-xs opacity-90">#00694b</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#ffe9e9] text-[#281718] border border-[#e6bcbd]">
            <p className="font-bold text-sm">Surface Container</p>
            <p className="text-xs opacity-90">#ffe9e9</p>
          </div>
        </div>
      </section>

      {/* Interactive Components Spec */}
      <section className="space-y-4">
        <h2 className="font-bold text-xl text-[#281718] dark:text-white">
          Button Variants
        </h2>
        <div className="flex flex-wrap gap-4 glass-panel p-6 rounded-3xl border border-white/40 artist-glow">
          <PillButton variant="primary" glow>
            Primary Gradient Glow
          </PillButton>
          <PillButton variant="secondary">Secondary Inset</PillButton>
          <PillButton variant="outline">Outline Border</PillButton>
          <PillButton variant="ghost">Ghost Button</PillButton>
        </div>
      </section>
    </div>
  );
};
