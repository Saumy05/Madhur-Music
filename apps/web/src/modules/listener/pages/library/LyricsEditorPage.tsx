import React from 'react';
import { PillButton } from '@/components/ui/PillButton';

export const LyricsEditorPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
          Synchronized Lyrics Editor
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Add timestamp markers to lyrics lines for karaoke sync.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/40 artist-glow space-y-4">
        <textarea
          rows={6}
          placeholder="Paste raw lyrics here..."
          className="w-full p-4 rounded-2xl bg-[#ffe9e9] text-xs font-mono focus:outline-none"
        />
        <PillButton variant="primary" glow className="mx-auto">
          Auto-Sync Timestamps
        </PillButton>
      </div>
    </div>
  );
};
