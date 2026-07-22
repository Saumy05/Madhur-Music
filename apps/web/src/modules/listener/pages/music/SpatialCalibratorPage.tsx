import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const SpatialCalibratorPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto text-center">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Spatial Audio Headroom Calibrator
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Measure binaural ear distance and head tracking response for 3D staging.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/40 artist-glow space-y-4">
        <span className="material-symbols-outlined text-6xl text-[#ba0034] animate-pulse">
          3d_rotation
        </span>
        <PillButton variant="primary" glow className="mx-auto">
          Start Spatial Sweep Calibration
        </PillButton>
      </div>
    </div>
  );
};
