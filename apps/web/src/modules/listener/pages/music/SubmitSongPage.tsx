import React, { useState } from 'react';
import { fetchYoutubeInfo, submitSong, YoutubeTrackInfo } from '@/data/songsApi';
import { useAuthStore } from '@/shared/auth/useAuthStore';

const isYouTubeUrl = (url: string) =>
  url.includes('youtube.com') || url.includes('youtu.be');

/** Only real MongoDB ObjectIds (24-char hex) are safe to send as @db.ObjectId */
const isValidObjectId = (id?: string | null): boolean =>
  typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);

type SubmitState = 'idle' | 'fetching' | 'ready' | 'submitting' | 'success' | 'error';

export const SubmitSongPage: React.FC = () => {
  const { user } = useAuthStore();

  const [url, setUrl] = useState('');
  const [meta, setMeta] = useState<YoutubeTrackInfo | null>(null);
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // ── Auto-fetch on YouTube URL input ──────────────────────────────────────

  const handleUrlChange = async (value: string) => {
    setUrl(value);
    setMeta(null);
    setErrorMsg('');

    if (!isYouTubeUrl(value)) {
      setState('idle');
      return;
    }

    setState('fetching');
    try {
      const info = await fetchYoutubeInfo(value);
      setMeta(info);
      setState('ready');
    } catch (e: any) {
      setErrorMsg(e.message || 'Could not fetch YouTube metadata');
      setState('error');
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!meta || state !== 'ready') return;

    setState('submitting');
    try {
      const result = await submitSong({
        youtubeUrl: meta.audioUrl,
        // Only send userId if it's a real MongoDB ObjectId — mock auth IDs would cause a 500
        submittedById: isValidObjectId(user?.id) ? user!.id : undefined,
      });
      setSuccessMsg(result.message);
      setState('success');
    } catch (e: any) {
      setErrorMsg(e.message || 'Submission failed');
      setState('error');
    }
  };

  const handleReset = () => {
    setUrl('');
    setMeta(null);
    setState('idle');
    setErrorMsg('');
    setSuccessMsg('');
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-lg mx-auto space-y-6 py-4 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
          Submit a Song
        </h1>
        <p className="text-sm text-[#5d3f40] dark:text-zinc-400">
          Share a YouTube link. An admin will review it — once approved, it'll be
          visible to the whole community. Until then, only you can see it.
        </p>
      </div>

      {/* Success */}
      {state === 'success' ? (
        <div className="rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-3xl">
              check_circle
            </span>
          </div>
          <div>
            <h2 className="text-base font-extrabold text-emerald-800 dark:text-emerald-300">
              Submitted for Review!
            </h2>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">{successMsg}</p>
          </div>
          {meta && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-emerald-100 dark:border-emerald-900 text-left">
              <img
                src={meta.coverUrl}
                alt={meta.title}
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#281718] dark:text-white truncate">{meta.title}</p>
                <p className="text-xs text-[#5d3f40] dark:text-zinc-400">{meta.artist}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-2xl text-sm font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors cursor-pointer"
          >
            Submit Another Song
          </button>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-white/40 p-6 space-y-5">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#5d3f40] dark:text-zinc-400">
              YouTube URL
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-red-500 text-xl">
                smart_display
              </span>
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://youtu.be/… or youtube.com/watch?v=…"
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-sm font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034] placeholder:text-zinc-400"
              />
              {state === 'fetching' && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined animate-spin text-[#ba0034] text-xl">
                  progress_activity
                </span>
              )}
              {state === 'ready' && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-emerald-500 text-xl">
                  check_circle
                </span>
              )}
            </div>

            {state === 'fetching' && (
              <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">
                Fetching song details from YouTube…
              </p>
            )}
            {(state === 'error') && (
              <p className="text-xs text-red-500 font-semibold">✗ {errorMsg}</p>
            )}
          </div>

          {/* Metadata preview */}
          {meta && state === 'ready' && (
            <div className="rounded-2xl border border-[#e6bcbd]/50 dark:border-zinc-700 overflow-hidden">
              {/* Cover + info */}
              <div className="flex gap-4 p-4 bg-[#ffe9e9]/20 dark:bg-zinc-800/50">
                <img
                  src={meta.coverUrl}
                  alt={meta.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-extrabold text-[#281718] dark:text-white leading-tight">
                    {meta.title}
                  </p>
                  <p className="text-xs text-[#5d3f40] dark:text-zinc-400 font-semibold">
                    {meta.artist}
                  </p>
                  <p className="text-xs text-zinc-400 font-mono">
                    {Math.floor(meta.durationSec / 60)}:{String(meta.durationSec % 60).padStart(2, '0')}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#ba0034] dark:text-pink-400 bg-[#ba0034]/10 dark:bg-pink-950/40 px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-xs">graphic_eq</span>
                    Lossless Audio
                  </span>
                </div>
              </div>

              {/* Pending notice */}
              <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 dark:bg-amber-950/30 border-t border-amber-100 dark:border-amber-900">
                <span className="material-symbols-outlined text-amber-500 text-lg flex-shrink-0 mt-0.5">
                  schedule
                </span>
                <div>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    Requires admin approval
                  </p>
                  <p className="text-[11px] text-amber-600 dark:text-amber-500 mt-0.5">
                    This song will be visible only to you until an admin reviews and approves it.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={state !== 'ready'}
            className="w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-[#ba0034] hover:bg-[#9a0028] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {state === 'submitting' ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                Submitting…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">send</span>
                Submit for Review
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-zinc-400">
            Only YouTube links are supported. The audio is streamed directly — nothing is downloaded.
          </p>
        </div>
      )}
    </div>
  );
};
