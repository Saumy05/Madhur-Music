import React from 'react';

export const AudioVisualizerPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto text-center">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Real-time Audio Visualizer
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          3D liquid spectrum graphics reactive to track beat and frequency.
        </p>
      </div>

      <div className="aspect-video w-full rounded-3xl premium-gradient flex items-center justify-center text-white artist-glow relative overflow-hidden">
        <div className="flex items-end gap-2 h-40">
          {[60, 90, 40, 80, 100, 70, 50, 85, 95, 60].map((h, i) => (
            <div
              key={i}
              className="w-4 bg-white/80 rounded-full animate-pulse"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
