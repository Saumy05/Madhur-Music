import React, { useEffect, useState, useCallback } from 'react';
import { Navigate } from 'react-router';
import { PillButton } from '@/components/ui/PillButton';
import {
  fetchSongs,
  fetchPendingSongs,
  createSong,
  deleteSong,
  approveSong,
  rejectSong,
  fetchYoutubeInfo,
  BackendSong,
} from '@/data/songsApi';
import { useAdminAuthStore } from '../auth/useAdminAuthStore';

const isYouTubeUrl = (url: string) =>
  url.includes('youtube.com') || url.includes('youtu.be');

type Tab = 'catalog' | 'pending';

// ── Status Badge ──────────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    PUBLISHED: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400',
    PENDING: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400',
    REJECTED: 'bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${map[status] ?? 'bg-zinc-100 text-zinc-500'}`}>
      {status}
    </span>
  );
};

// ── Pending Song Card ─────────────────────────────────────────────────────────

interface PendingCardProps {
  song: BackendSong & { submittedBy?: { displayName: string; username: string } };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  processing: boolean;
}

const PendingCard: React.FC<PendingCardProps> = ({ song, onApprove, onReject, processing }) => (
  <div className="flex gap-4 p-5 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors">
    {/* Cover */}
    {song.coverUrl ? (
      <img
        src={song.coverUrl}
        alt={song.title}
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
        onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
      />
    ) : (
      <div className="w-16 h-16 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-2xl">music_note</span>
      </div>
    )}

    {/* Info */}
    <div className="flex-1 min-w-0 space-y-1">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-sm font-bold text-[#281718] dark:text-zinc-100 truncate">{song.title}</p>
        {isYouTubeUrl(song.audioUrl) && (
          <span className="material-symbols-outlined text-red-500 text-base flex-shrink-0" title="YouTube">smart_display</span>
        )}
      </div>
      <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
        {song.artist?.name}
      </p>
      {song.submittedBy && (
        <p className="text-[11px] text-zinc-400 font-semibold flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">person</span>
          Submitted by <span className="text-[#ba0034]">{song.submittedBy.displayName}</span>
          <span className="text-zinc-400">@{song.submittedBy.username}</span>
        </p>
      )}
      <p className="text-[10px] text-zinc-400 font-mono">
        {new Date((song as any).createdAt).toLocaleString('en-IN')}
      </p>
      {song.audioUrl && (
        <a
          href={song.audioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-sky-500 hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          Preview on YouTube
        </a>
      )}
    </div>

    {/* Actions */}
    <div className="flex flex-col gap-2 flex-shrink-0">
      <button
        onClick={() => onApprove(song.id)}
        disabled={processing}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50 cursor-pointer"
      >
        <span className="material-symbols-outlined text-base">check_circle</span>
        Approve
      </button>
      <button
        onClick={() => onReject(song.id)}
        disabled={processing}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
      >
        <span className="material-symbols-outlined text-base">cancel</span>
        Reject
      </button>
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────

export const AdminSongsPage: React.FC = () => {
  const { token } = useAdminAuthStore();
  if (!token) return <Navigate to="/admin/login" replace />;

  const [activeTab, setActiveTab] = useState<Tab>('catalog');
  const [songs, setSongs] = useState<BackendSong[]>([]);
  const [pending, setPending] = useState<BackendSong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // Form state
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [fetchingMeta, setFetchingMeta] = useState(false);
  const [metaError, setMetaError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [durationSec, setDurationSec] = useState('180');
  const [audioUrl, setAudioUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [explicit, setExplicit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const { clearSession } = useAdminAuthStore();

  // ── Load data ─────────────────────────────────────────────────────────────

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [catalogData, pendingData] = await Promise.all([
        fetchSongs(),
        fetchPendingSongs(token),
      ]);
      setSongs(catalogData.filter((s: any) => s.status === 'PUBLISHED'));
      setPending(pendingData);
    } catch (e: any) {
      // Stale/invalid JWT → clear session and redirect to login
      if (e.message?.toLowerCase().includes('unauthorized') || e.message?.includes('401')) {
        clearSession();
        return; // Navigate guard will redirect to /admin/login
      }
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [token, clearSession]);

  useEffect(() => { loadAll(); }, [loadAll]);

  // ── YouTube auto-fill ────────────────────────────────────────────────────

  const handleYoutubePaste = async (url: string) => {
    setYoutubeUrl(url);
    setMetaError(null);
    if (!isYouTubeUrl(url)) return;

    setFetchingMeta(true);
    try {
      const info = await fetchYoutubeInfo(url);
      setTitle(info.title);
      setArtistName(info.artist);
      setDurationSec(String(info.durationSec));
      setCoverUrl(info.coverUrl);
      setAudioUrl(info.audioUrl);
    } catch (e: any) {
      setMetaError(e.message || 'Could not fetch YouTube metadata');
    } finally {
      setFetchingMeta(false);
    }
  };

  const resetForm = () => {
    setYoutubeUrl(''); setTitle(''); setArtistName(''); setAlbumTitle('');
    setDurationSec('180'); setAudioUrl(''); setCoverUrl('');
    setExplicit(false); setMetaError(null);
  };

  // ── Submit (admin direct publish) ────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !artistName || !audioUrl) return;

    setSubmitting(true);
    setFormSuccess(false);
    try {
      await createSong(token, { title, artistName, albumTitle: albumTitle || undefined, durationSec: Number(durationSec) || 180, audioUrl, coverUrl: coverUrl || undefined, explicit });
      resetForm();
      setFormSuccess(true);
      await loadAll();
      setTimeout(() => setFormSuccess(false), 3000);
    } catch (err: any) {
      setMetaError(err.message || 'Failed to add song');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this song from the catalog?')) return;
    try { await deleteSong(token, id); await loadAll(); }
    catch (err: any) { alert(err.message); }
  };

  // ── Approve / Reject ─────────────────────────────────────────────────────

  const handleApprove = async (id: string) => {
    setProcessing(true);
    try {
      await approveSong(token, id);
      await loadAll();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Reject this song? It will remain visible only to the submitter.')) return;
    setProcessing(true);
    try {
      await rejectSong(token, id);
      await loadAll();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setProcessing(false);
    }
  };

  const formatDuration = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
            Song Catalog Management
          </h1>
          <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
            Add songs directly (PUBLISHED) or review user-submitted tracks.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold">✗ {error}</div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'catalog' ? 'bg-[#ba0034] text-white shadow' : 'bg-[#ffe9e9]/60 dark:bg-white/10 text-[#5d3f40] dark:text-zinc-400 hover:bg-[#ffe9e9] dark:hover:bg-white/15'}`}
        >
          <span className="material-symbols-outlined text-base">library_music</span>
          Active Catalog
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${activeTab === 'catalog' ? 'bg-white/20' : 'bg-[#ba0034]/10 text-[#ba0034]'}`}>
            {songs.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'pending' ? 'bg-amber-500 text-white shadow' : 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/40 border border-amber-200 dark:border-amber-900'}`}
        >
          <span className="material-symbols-outlined text-base">schedule</span>
          Pending Review
          {pending.length > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${activeTab === 'pending' ? 'bg-white/20' : 'bg-amber-500 text-white'}`}>
              {pending.length}
            </span>
          )}
        </button>
      </div>

      {/* ── CATALOG TAB ──────────────────────────────────────────────────────── */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-panel rounded-3xl border border-white/40 p-6 space-y-5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#ba0034]">Add New Track</p>

              {/* YouTube URL */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase flex items-center gap-1.5">
                  <span className="text-red-500">▶</span> YouTube URL (Auto-fill)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => handleYoutubePaste(e.target.value)}
                    placeholder="https://youtu.be/…"
                    className="w-full px-3 py-2.5 pr-10 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] placeholder:text-zinc-400"
                  />
                  {fetchingMeta && <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined animate-spin text-[#ba0034] text-base">progress_activity</span>}
                  {!fetchingMeta && title && <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-emerald-500 text-base">check_circle</span>}
                </div>
                {metaError && <p className="text-[11px] text-red-500 font-semibold">✗ {metaError}</p>}
              </div>

              {/* Cover preview */}
              {coverUrl && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#ffe9e9]/30 dark:bg-zinc-800/50 border border-[#e6bcbd]/40 dark:border-zinc-700">
                  <img src={coverUrl} alt="cover" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#281718] dark:text-white truncate">{title}</p>
                    <p className="text-[11px] text-[#5d3f40] dark:text-zinc-400">{artistName}</p>
                    <p className="text-[11px] text-zinc-400">{formatDuration(Number(durationSec))}</p>
                  </div>
                </div>
              )}

              <div className="border-t border-[#e6bcbd]/30 dark:border-zinc-700/50 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Track Details</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">Song Title *</label>
                  <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Blinding Lights" className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">Artist Name *</label>
                  <input required value={artistName} onChange={(e) => setArtistName(e.target.value)} placeholder="e.g. The Weeknd" className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">Album</label>
                    <input value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} placeholder="Optional" className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">Duration (sec)</label>
                    <input type="number" min="1" value={durationSec} onChange={(e) => setDurationSec(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">Audio / YouTube URL *</label>
                  <input required value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} placeholder="https://… (auto-filled from YouTube)" className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#5d3f40] dark:text-zinc-400 uppercase">Cover Art URL</label>
                  <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://… (auto-filled from YouTube)" className="w-full px-3 py-2 rounded-xl bg-[#ffe9e9]/40 dark:bg-zinc-800 border border-[#e6bcbd]/50 dark:border-zinc-700 text-xs font-semibold text-[#281718] dark:text-white focus:outline-none focus:border-[#ba0034] dark:focus:border-[#ba0034]" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={explicit} onChange={(e) => setExplicit(e.target.checked)} className="accent-[#ba0034] w-3.5 h-3.5" />
                  <span className="text-xs font-semibold text-[#5d3f40] dark:text-zinc-400">Contains Explicit Content</span>
                </label>
                {formSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">check_circle</span>Track published to catalog!
                  </div>
                )}
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={resetForm} className="flex-1 py-2.5 rounded-2xl text-xs font-bold text-[#5d3f40] dark:text-zinc-400 border border-[#e6bcbd]/50 dark:border-zinc-700 hover:bg-[#ffe9e9]/50 dark:hover:bg-white/5 transition-colors cursor-pointer">Reset</button>
                  <button type="submit" disabled={submitting || fetchingMeta} className="flex-1 py-2.5 rounded-2xl text-xs font-bold text-white bg-[#ba0034] hover:bg-[#9a0028] transition-colors disabled:opacity-50 cursor-pointer">
                    {submitting ? 'Publishing…' : 'Publish to Catalog'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Catalog list */}
          <div className="lg:col-span-3">
            <div className="glass-panel rounded-3xl border border-white/40 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6bcbd]/20 dark:border-white/10">
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#ba0034]">
                  Active Catalog
                  {!loading && <span className="ml-2 text-[#5d3f40] dark:text-zinc-400 normal-case font-semibold">({songs.length} tracks)</span>}
                </p>
                <button onClick={loadAll} disabled={loading} className="rounded-full p-1.5 hover:bg-[#ffe9e9] dark:hover:bg-white/10 transition-colors cursor-pointer" title="Refresh">
                  <span className={`material-symbols-outlined text-[#ba0034] text-lg ${loading ? 'animate-spin' : ''}`}>refresh</span>
                </button>
              </div>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#5d3f40] dark:text-zinc-400">
                  <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
                  <p className="text-sm font-semibold">Loading catalog…</p>
                </div>
              ) : songs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#5d3f40] dark:text-zinc-500">
                  <span className="material-symbols-outlined text-4xl">library_music</span>
                  <p className="text-sm font-semibold">No published songs yet</p>
                </div>
              ) : (
                <div className="divide-y divide-[#e6bcbd]/20 dark:divide-white/5">
                  {[...songs]
                    .sort((a, b) => {
                      const artistA = (a.artist?.name || '').toLowerCase();
                      const artistB = (b.artist?.name || '').toLowerCase();
                      if (artistA !== artistB) return artistA.localeCompare(artistB);
                      const albumA = (a.album?.title || '').toLowerCase();
                      const albumB = (b.album?.title || '').toLowerCase();
                      if (albumA !== albumB) return albumA.localeCompare(albumB);
                      return (a.title || '').localeCompare(b.title || '');
                    })
                    .map((song) => (
                      <div key={song.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#ffe9e9]/30 dark:hover:bg-white/5 transition-colors group">
                        {song.coverUrl ? (
                          <img src={song.coverUrl} alt={song.title} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=60'; }} />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-[#ba0034]/10 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-[#ba0034] text-xl">music_note</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-[#281718] dark:text-zinc-100 truncate">{song.title}</p>
                            {song.explicit && <span className="flex-shrink-0 px-1.5 py-0.5 rounded bg-[#ba0034]/10 text-[#ba0034] text-[9px] font-black">E</span>}
                          </div>
                          <p className="text-[11px] text-[#5d3f40] dark:text-zinc-400 truncate">
                            {song.artist?.name || '—'} {song.album?.title ? `• ${song.album.title}` : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[11px] font-mono text-[#5d3f40] dark:text-zinc-500 mr-2">{formatDuration(song.durationSec)}</span>
                          
                          {/* Admin Download Action */}
                          <a
                            href={song.audioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={`${song.artist?.name || 'Track'} - ${song.title}.mp3`}
                            className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                            title="Admin Privileged Download"
                          >
                            <span className="material-symbols-outlined text-sm">download</span>
                            <span className="hidden sm:inline">Download</span>
                          </a>

                          <button onClick={() => handleDelete(song.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-950/40 cursor-pointer" title="Remove">
                            <span className="material-symbols-outlined text-red-500 text-lg">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PENDING TAB ──────────────────────────────────────────────────────── */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-[#5d3f40] dark:text-zinc-400">
              <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
              <span className="text-sm font-semibold">Loading submissions…</span>
            </div>
          ) : pending.length === 0 ? (
            <div className="glass-panel rounded-3xl border border-white/40 flex flex-col items-center justify-center py-20 gap-3 text-[#5d3f40] dark:text-zinc-500">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-500 text-3xl">check_circle</span>
              </div>
              <p className="text-sm font-bold">All caught up!</p>
              <p className="text-xs">No user submissions awaiting review</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 px-1">
                <span className="material-symbols-outlined text-amber-500">info</span>
                <p className="text-xs font-semibold text-[#5d3f40] dark:text-zinc-400">
                  {pending.length} submission{pending.length !== 1 ? 's' : ''} awaiting review. Approve to make visible to all users; reject to keep it private.
                </p>
              </div>
              <div className="space-y-3">
                {pending.map((song) => (
                  <PendingCard
                    key={song.id}
                    song={song as any}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    processing={processing}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
