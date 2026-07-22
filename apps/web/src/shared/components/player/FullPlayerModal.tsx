import React, { useState, useEffect, useRef } from 'react';
import { usePlayerStore, Track } from '@/shared/player/usePlayerStore';

// ── Synced Lyric Line Interface ──────────────────────────────────────────────

export interface SyncedLyricLine {
  timeSec: number;
  text: string;
}

// ── Intelligent Multi-Keyword Scored Lyrics Engine ───────────────────────────

async function fetchRealtimeLyrics(
  rawArtist: string,
  rawTitle: string
): Promise<{ lines: SyncedLyricLine[]; isSynced: boolean; matchedTrack?: string } | null> {
  // Extract key search terms from title and artist
  const words = rawTitle
    .replace(/[|()\[\]-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim().toLowerCase())
    .filter(
      (w) =>
        w.length > 1 &&
        !['full', 'video', 'song', 'official', 'audio', 'lyric', 'hd', '4k', 'remaster', 'remastered'].includes(w)
    );

  // Extract clean primary title (text before first '|' or '-')
  const primaryTitle = rawTitle
    .split('|')[0]
    .split('-')[0]
    .replace(/\s*\(.*?\)/g, '')
    .replace(/\b(full video song|video song|official video|lyric video|audio song|official audio|full song)\b/gi, '')
    .trim();

  // Determine search queries to attempt
  const searchQueries = [
    primaryTitle,
    `${primaryTitle} ${rawArtist}`.trim(),
  ].filter(Boolean);

  let candidateResults: any[] = [];

  for (const query of searchQueries) {
    try {
      const res = await fetch(`https://lrclib.net/api/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = (await res.json()) as any[];
        if (Array.isArray(data) && data.length > 0) {
          candidateResults.push(...data);
        }
      }
    } catch {
      /* continue */
    }
  }

  // Deduplicate candidate results by id
  const seenIds = new Set<number>();
  const uniqueCandidates = candidateResults.filter((r) => {
    if (!r.id || seenIds.has(r.id)) return false;
    seenIds.add(r.id);
    return true;
  });

  // Filter only items that actually have lyrics
  const validCandidates = uniqueCandidates.filter(
    (r) => (r.syncedLyrics && r.syncedLyrics.trim()) || (r.plainLyrics && r.plainLyrics.trim())
  );

  if (validCandidates.length === 0) {
    // Fallback: lyrics.ovh API
    if (primaryTitle && rawArtist) {
      try {
        const res = await fetch(
          `https://api.lyrics.ovh/v1/${encodeURIComponent(rawArtist)}/${encodeURIComponent(primaryTitle)}`
        );
        if (res.ok) {
          const data = (await res.json()) as { lyrics?: string };
          if (data.lyrics && data.lyrics.trim()) {
            const lines = data.lyrics
              .split('\n')
              .map((l) => l.trim())
              .filter(Boolean)
              .map((t, i) => ({ timeSec: i * 4, text: t }));
            return { lines, isSynced: false, matchedTrack: `${primaryTitle} by ${rawArtist}` };
          }
        }
      } catch {
        /* fallback failed */
      }
    }
    return null;
  }

  // Score candidates against our title & artist words
  const scored = validCandidates.map((candidate) => {
    let score = 0;
    const blob = `${candidate.trackName || ''} ${candidate.artistName || ''} ${candidate.albumName || ''}`.toLowerCase();

    // +10 for synced lyrics preference
    if (candidate.syncedLyrics) score += 10;

    // Word match bonuses
    for (const w of words) {
      if (blob.includes(w)) {
        score += 15;
      }
    }

    return { candidate, score };
  });

  // Sort by highest score first
  scored.sort((a, b) => b.score - a.score);

  const best = scored[0].candidate;
  const matchedTrack = `${best.trackName} - ${best.artistName}`;

  if (best.syncedLyrics && best.syncedLyrics.trim()) {
    const parsed = parseLrc(best.syncedLyrics);
    if (parsed.length > 0) {
      return { lines: parsed, isSynced: true, matchedTrack };
    }
  }

  if (best.plainLyrics && best.plainLyrics.trim()) {
    const lines = best.plainLyrics
      .split('\n')
      .map((l: string) => l.trim())
      .filter(Boolean)
      .map((t: string, i: number) => ({ timeSec: i * 4, text: t }));
    return { lines, isSynced: false, matchedTrack };
  }

  return null;
}

// ── LRC Parser ────────────────────────────────────────────────────────────────

function parseLrc(lrcText: string): SyncedLyricLine[] {
  const lines: SyncedLyricLine[] = [];
  const timeRegex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/g;

  const rawLines = lrcText.split('\n');
  for (const line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    timeRegex.lastIndex = 0;
    const matches = Array.from(trimmed.matchAll(timeRegex));
    if (matches.length === 0) continue;

    const text = trimmed.replace(timeRegex, '').trim();
    if (!text) continue;

    for (const match of matches) {
      const min = parseInt(match[1], 10);
      const sec = parseInt(match[2], 10);
      const ms = match[3] ? parseInt(match[3].padEnd(3, '0').slice(0, 3), 10) : 0;
      const timeSec = min * 60 + sec + ms / 1000;
      lines.push({ timeSec, text });
    }
  }

  return lines.sort((a, b) => a.timeSec - b.timeSec);
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const FullPlayerModal: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seek,
    volume,
    setVolume,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
    nextTrack,
    previousTrack,
    isFullPlayerOpen,
    setFullPlayerOpen,
    audioMode,
    queue,
    setQueue,
    playTrack,
  } = usePlayerStore();

  const [activeTab, setActiveTab] = useState<'NOW_PLAYING' | 'LYRICS' | 'QUEUE'>('NOW_PLAYING');
  const [lyricData, setLyricData] = useState<{ lines: SyncedLyricLine[]; isSynced: boolean; matchedTrack?: string } | null>(null);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [lyricsError, setLyricsError] = useState(false);
  const [lyricOffset, setLyricOffset] = useState<number>(0);

  const activeLineRef = useRef<HTMLParagraphElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  // Fetch lyrics on track change or when switching to Lyrics tab
  useEffect(() => {
    if (!currentTrack) return;

    setLyricData(null);
    setLyricsLoading(true);
    setLyricsError(false);
    setLyricOffset(0); // reset offset on new track

    fetchRealtimeLyrics(currentTrack.artist, currentTrack.title).then((res) => {
      if (res && res.lines.length > 0) {
        setLyricData(res);
        setLyricsError(false);
      } else {
        setLyricsError(true);
      }
      setLyricsLoading(false);
    });
  }, [currentTrack?.id, currentTrack?.title]);

  // Effective time taking into account user/video offset adjustment
  const effectiveTime = Math.max(0, currentTime + lyricOffset);

  // Find currently active lyric line index based on playback time
  let currentLineIndex = -1;
  if (lyricData?.lines) {
    for (let i = lyricData.lines.length - 1; i >= 0; i--) {
      if (effectiveTime >= lyricData.lines[i].timeSec) {
        currentLineIndex = i;
        break;
      }
    }
  }

  // Auto-scroll active line into center view
  useEffect(() => {
    if (activeTab === 'LYRICS' && activeLineRef.current && lyricData?.isSynced) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentLineIndex, activeTab, lyricData?.isSynced]);

  if (!isFullPlayerOpen || !currentTrack) return null;

  const progressPct = duration ? (currentTime / duration) * 100 : 0;

  const handleRemoveFromQueue = (index: number) => {
    setQueue(queue.filter((_, i) => i !== index));
  };

  const handleClearQueue = () => {
    setQueue([]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#0a070c] text-white selection:bg-[#ff2a5f] selection:text-white font-sans antialiased">
      {/* Immersive Animated Background Artwork */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src={currentTrack.coverUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-125 blur-3xl opacity-35 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a070c]/70 via-[#0a070c]/90 to-[#0a070c]" />
        
        {/* Dynamic Glow Orbs */}
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-40 transition-all duration-1000 ${
            isPlaying ? 'scale-110 opacity-50' : 'scale-90 opacity-20'
          }`}
          style={{
            background: 'radial-gradient(circle, #ff2a5f 0%, #7c3aed 50%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between w-full max-w-3xl mx-auto px-6 pt-6 pb-2 flex-shrink-0 z-10">
        <button
          onClick={() => setFullPlayerOpen(false)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl flex items-center justify-center text-white transition-all transform active:scale-90 cursor-pointer shadow-lg border border-white/10"
          title="Minimize player"
        >
          <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
        </button>

        {/* Tab Selector: Player | Lyrics | Queue */}
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-2xl p-1 rounded-full border border-white/15 shadow-2xl">
          <button
            onClick={() => setActiveTab('NOW_PLAYING')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'NOW_PLAYING'
                ? 'bg-gradient-to-r from-[#ff2a5f] to-[#e11d48] text-white shadow-lg shadow-[#ff2a5f]/40 scale-105'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Player
          </button>
          <button
            onClick={() => setActiveTab('LYRICS')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'LYRICS'
                ? 'bg-gradient-to-r from-[#ff2a5f] to-[#e11d48] text-white shadow-lg shadow-[#ff2a5f]/40 scale-105'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Lyrics</span>
            {lyricData?.isSynced && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Live Synced" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('QUEUE')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'QUEUE'
                ? 'bg-gradient-to-r from-[#ff2a5f] to-[#e11d48] text-white shadow-lg shadow-[#ff2a5f]/40 scale-105'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Queue</span>
            {queue.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
                {queue.length}
              </span>
            )}
          </button>
        </div>

        {/* Mode Tag */}
        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 text-pink-300 border border-white/10 backdrop-blur-md">
          {audioMode.replace(/_/g, ' ')}
        </span>
      </header>

      {/* ── Main Content Area ────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6 py-4 min-h-0 z-10">
        
        {/* NOW PLAYING TAB */}
        {activeTab === 'NOW_PLAYING' && (
          <div className="flex flex-col items-center text-center w-full space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Album Art Container */}
            <div className="relative group">
              <div
                className={`absolute inset-0 rounded-[2.5rem] blur-3xl transition-all duration-1000 ${
                  isPlaying ? 'opacity-60 scale-105' : 'opacity-25 scale-95'
                }`}
                style={{
                  background: 'radial-gradient(circle, #ff2a5f 0%, #8b5cf6 60%, transparent 100%)',
                }}
              />

              <div
                className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2.5rem] overflow-hidden border-2 border-white/20 shadow-2xl transition-all duration-700 ${
                  isPlaying ? 'scale-100 shadow-[0_20px_60px_-15px_rgba(255,42,95,0.4)]' : 'scale-95 opacity-90'
                }`}
              >
                <img
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Track Info */}
            <div className="space-y-2 w-full max-w-md">
              <h1 className="font-extrabold text-2xl sm:text-3xl text-white leading-tight truncate drop-shadow-md">
                {currentTrack.title}
              </h1>
              <p className="text-base font-semibold text-zinc-400 truncate">
                {currentTrack.artist}
                {currentTrack.album && currentTrack.album !== 'Single' && (
                  <span className="text-zinc-500 font-normal"> · {currentTrack.album}</span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* REAL-TIME LYRICS TAB */}
        {activeTab === 'LYRICS' && (
          <div className="w-full max-w-xl h-full flex flex-col min-h-0 animate-in fade-in duration-300">
            {/* Sync Micro-Tuner bar if lyrics exist */}
            {lyricData?.isSynced && (
              <div className="flex items-center justify-between px-4 py-2 mb-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-xs">
                <span className="text-zinc-400 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-pink-400">tune</span>
                  <span>Sync Tuner:</span>
                  <span className="font-mono font-bold text-white">
                    {lyricOffset > 0 ? `+${lyricOffset.toFixed(1)}s` : `${lyricOffset.toFixed(1)}s`}
                  </span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLyricOffset((o) => o - 1)}
                    className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold active:scale-95 transition-all cursor-pointer"
                  >
                    -1s
                  </button>
                  <button
                    onClick={() => setLyricOffset((o) => o - 0.5)}
                    className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold active:scale-95 transition-all cursor-pointer"
                  >
                    -0.5s
                  </button>
                  <button
                    onClick={() => setLyricOffset(0)}
                    className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white font-mono text-[10px] active:scale-95 transition-all cursor-pointer"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setLyricOffset((o) => o + 0.5)}
                    className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold active:scale-95 transition-all cursor-pointer"
                  >
                    +0.5s
                  </button>
                  <button
                    onClick={() => setLyricOffset((o) => o + 1)}
                    className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold active:scale-95 transition-all cursor-pointer"
                  >
                    +1s
                  </button>
                </div>
              </div>
            )}

            <div
              ref={lyricsContainerRef}
              className="flex-1 overflow-y-auto space-y-4 px-4 py-4 text-center no-scrollbar scroll-smooth relative min-h-0"
            >
              {lyricsLoading && (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-[#ff2a5f] animate-spin" />
                  <p className="text-sm font-bold text-zinc-400 animate-pulse">
                    Searching real-time lyrics for "{currentTrack.title}"…
                  </p>
                </div>
              )}

              {!lyricsLoading && lyricsError && (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-pink-400 mb-2">
                    <span className="material-symbols-outlined text-3xl">lyrics</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Lyrics unavailable</h3>
                  <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                    We couldn't fetch live synced lyrics for this track automatically.
                  </p>
                </div>
              )}

              {!lyricsLoading && lyricData && (
                <div className="space-y-4 py-8">
                  {lyricData.matchedTrack && (
                    <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-4 opacity-70">
                      Matched: {lyricData.matchedTrack}
                    </p>
                  )}
                  {lyricData.lines.map((line, idx) => {
                    const isActive = idx === currentLineIndex;
                    return (
                      <p
                        key={idx}
                        ref={isActive ? activeLineRef : null}
                        onClick={() => lyricData.isSynced && seek(line.timeSec - lyricOffset)}
                        className={`transition-all duration-300 text-lg sm:text-2xl font-bold leading-relaxed cursor-pointer select-none ${
                          isActive
                            ? 'text-white scale-110 drop-shadow-[0_0_25px_rgba(255,42,95,0.8)] font-black py-1'
                            : 'text-zinc-500/70 hover:text-zinc-300 opacity-60 hover:opacity-100 scale-95'
                        }`}
                      >
                        {line.text}
                      </p>
                    );
                  })}
                  <div className="h-24" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* QUEUE TAB */}
        {activeTab === 'QUEUE' && (
          <div className="w-full max-w-xl h-full flex flex-col min-h-0 space-y-5 animate-in fade-in duration-300">
            {/* Header / Clear */}
            <div className="flex items-center justify-between px-2 flex-shrink-0">
              <div>
                <h3 className="font-extrabold text-lg text-white">Playback Queue</h3>
                <p className="text-xs text-zinc-400">
                  {queue.length} track{queue.length !== 1 ? 's' : ''} upcoming
                </p>
              </div>

              {queue.length > 0 && (
                <button
                  onClick={handleClearQueue}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  Clear Queue
                </button>
              )}
            </div>

            {/* Currently Playing Bar */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  className="w-11 h-11 rounded-xl object-cover border border-white/20 flex-shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-400 block">
                    Now Playing
                  </span>
                  <h4 className="text-xs font-extrabold text-white truncate">{currentTrack.title}</h4>
                  <p className="text-[11px] font-semibold text-zinc-400 truncate">{currentTrack.artist}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-pink-400 text-xl animate-pulse">
                equalizer
              </span>
            </div>

            {/* Queue Track List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar min-h-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1 pt-2">
                Next Up
              </h4>

              {queue.length > 0 ? (
                queue.map((track, idx) => (
                  <div
                    key={`${track.id}-${idx}`}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                    onClick={() => playTrack(track, queue.slice(idx + 1))}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="text-xs font-mono font-bold text-zinc-500 w-5 text-center">
                        {idx + 1}
                      </span>
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-white truncate group-hover:text-pink-400 transition-colors">
                          {track.title}
                        </h5>
                        <p className="text-[11px] text-zinc-400 truncate">{track.artist}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs font-mono text-zinc-500">
                        {track.durationFormatted}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromQueue(idx);
                        }}
                        className="p-1 rounded-full text-zinc-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                        title="Remove from queue"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-2">
                  <span className="material-symbols-outlined text-4xl text-zinc-600">
                    queue_music
                  </span>
                  <p className="text-xs font-bold text-zinc-400">Your Queue is Empty</p>
                  <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                    Click the 3 dots (<strong className="text-pink-400 font-mono">⋮</strong>) on any track to add it to your queue!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer Controls ───────────────────────────────────────────── */}
      <footer className="w-full max-w-3xl mx-auto px-6 pb-8 flex-shrink-0 z-10 space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="relative w-full h-2 bg-white/10 rounded-full cursor-pointer group backdrop-blur-md">
            {/* Progress Fill */}
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#ff2a5f] to-[#e11d48] rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
            {/* Hover Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-xl shadow-black/50 border-2 border-[#ff2a5f] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progressPct}% - 8px)` }}
            />
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs font-mono font-bold text-zinc-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={toggleShuffle}
            className={`p-3 rounded-2xl transition-all cursor-pointer ${
              isShuffle
                ? 'text-[#ff2a5f] bg-[#ff2a5f]/15 border border-[#ff2a5f]/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
            title="Shuffle"
          >
            <span className="material-symbols-outlined text-2xl">shuffle</span>
          </button>

          <button
            onClick={previousTrack}
            className="p-3 text-white hover:text-pink-400 active:scale-90 transition-all cursor-pointer"
            title="Previous track"
          >
            <span className="material-symbols-outlined text-4xl">skip_previous</span>
          </button>

          <button
            onClick={togglePlay}
            className="w-18 h-18 rounded-full bg-gradient-to-tr from-[#ff2a5f] to-[#e11d48] hover:from-[#e11d48] hover:to-[#be123c] flex items-center justify-center text-white shadow-[0_10px_35px_rgba(255,42,95,0.45)] active:scale-95 transition-all cursor-pointer border border-white/20"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <span className="material-symbols-outlined text-4xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
          </button>

          <button
            onClick={nextTrack}
            className="p-3 text-white hover:text-pink-400 active:scale-90 transition-all cursor-pointer"
            title="Next track"
          >
            <span className="material-symbols-outlined text-4xl">skip_next</span>
          </button>

          <button
            onClick={toggleRepeat}
            className={`p-3 rounded-2xl transition-all cursor-pointer ${
              isRepeat
                ? 'text-[#ff2a5f] bg-[#ff2a5f]/15 border border-[#ff2a5f]/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
            title="Repeat"
          >
            <span className="material-symbols-outlined text-2xl">repeat</span>
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 max-w-xs mx-auto text-zinc-400">
          <span className="material-symbols-outlined text-xl flex-shrink-0">
            {volume === 0 ? 'volume_off' : volume < 0.4 ? 'volume_down' : 'volume_up'}
          </span>
          <div className="relative flex-1 h-1.5 bg-white/10 rounded-full group cursor-pointer">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#ff2a5f] to-[#e11d48] rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <span className="text-xs font-mono font-bold text-zinc-400 w-8 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </footer>
    </div>
  );
};
