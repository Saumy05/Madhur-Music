import React from 'react';

export const DeveloperPortalPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#ffe9e9] text-[#ba0034]">
          API & Developer Portal
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-2">
          Madhur Open Audio API & SDKs
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Build custom player integrations, stem isolation plugins, and ambient light hooks.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-4">
        <h3 className="font-bold text-lg text-[#281718] dark:text-white">
          SDK Quickstart Example
        </h3>
        <pre className="p-4 rounded-2xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto">
{`import { MadhurAudioEngine } from '@madhur/sdk';

const player = new MadhurAudioEngine({
  apiKey: 'madhur_live_pk_98420x',
  spatialAudio: true,
  bitrate: '24-bit/192kHz',
});

await player.connectStream('tr-1');
player.on('stemIsolated', (stems) => {
  console.log('Isolated Vocals & Bass:', stems);
});`}
        </pre>
      </div>
    </div>
  );
};
