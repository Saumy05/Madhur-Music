import React, { useState } from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const PodcastEpisodesStudioPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [season, setSeason] = useState('3');
  const [episodeNum, setEpisodeNum] = useState('105');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Podcast Creator & Episode Studio
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Upload MP3/FLAC audio files, generate AI show notes, set timestamps & distribute to Apple Podcasts, Spotify & RSS feeds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 space-y-5">
          <h2 className="text-lg font-extrabold text-[#281718] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba0034]">upload_file</span>
            Publish New Episode
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1">Season</label>
                <input
                  type="number"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1">Episode #</label>
                <input
                  type="number"
                  value={episodeNum}
                  onChange={(e) => setEpisodeNum(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1">Episode Title</label>
              <input
                type="text"
                placeholder="e.g. Ep 105: The Evolution of Immersive Audio"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#281718] dark:text-white mb-1">Show Notes & Summary</label>
              <textarea
                rows={4}
                placeholder="Detailed episode description, guest credentials, links & timestamps..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9] dark:bg-white/10 text-xs font-semibold"
              />
            </div>

            <div className="border-2 border-dashed border-[#ba0034]/40 p-6 rounded-2xl text-center space-y-2 bg-[#ffe9e9]/30 dark:bg-white/5">
              <span className="material-symbols-outlined text-4xl text-[#ba0034]">cloud_upload</span>
              <p className="text-xs font-bold text-[#281718] dark:text-white">Drag & drop master audio (WAV, FLAC, MP3)</p>
              <p className="text-[10px] text-[#5d3f40]">Max file size: 500MB (Recommended: 320kbps Stereo MP3)</p>
            </div>

            <PillButton variant="primary" glow className="w-full py-3">
              Process & Publish Episode S{season}E{episodeNum}
            </PillButton>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
          <h3 className="font-extrabold text-base text-[#281718] dark:text-white">RSS Feed & Distribution Status</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 space-y-1">
              <span className="text-[10px] font-bold text-[#ba0034] block">Public RSS Feed URL</span>
              <code className="text-[11px] font-mono break-all text-[#281718] dark:text-zinc-200">https://feed.madhur.com/podcasts/sonic-pulse.xml</code>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-between">
              <span>Apple Podcasts Sync</span>
              <span className="material-symbols-outlined text-base">check_circle</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-between">
              <span>Spotify for Podcasters</span>
              <span className="material-symbols-outlined text-base">check_circle</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-between">
              <span>YouTube Music RSS</span>
              <span className="material-symbols-outlined text-base">check_circle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
