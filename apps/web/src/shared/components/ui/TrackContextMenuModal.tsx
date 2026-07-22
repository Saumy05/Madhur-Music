import React, { useState } from 'react';
import { Track, usePlayerStore } from '@/shared/player/usePlayerStore';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { useAdminAuthStore } from '@/modules/admin/auth/useAdminAuthStore';
import { usePlaylistStore } from '@/shared/playlists/usePlaylistStore';

interface TrackContextMenuModalProps {
  track: Track;
  isOpen: boolean;
  onClose: () => void;
}

export const TrackContextMenuModal: React.FC<TrackContextMenuModalProps> = ({
  track,
  isOpen,
  onClose,
}) => {
  const { user } = useAuthStore();
  const { token: adminToken, adminUser } = useAdminAuthStore();
  const { addToQueue, playTrack, currentTrack } = usePlayerStore();
  const { playlists, createPlaylist, addTrackToPlaylist } = usePlaylistStore();

  const [mode, setMode] = useState<'ACTIONS' | 'SELECT_PLAYLIST' | 'CREATE_PLAYLIST'>('ACTIONS');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Check if current user is admin
  const isAdmin =
    !!adminToken ||
    adminUser?.role === 'ADMIN' ||
    user?.role === 'ADMIN' ||
    user?.role === 'ADMINISTRATOR';

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
      onClose();
      setMode('ACTIONS');
    }, 1200);
  };

  const handlePlayNext = () => {
    addToQueue(track);
    showToast(`"${track.title}" added to queue`);
  };

  const handleAddToPlaylist = (playlistId: string, playlistName: string) => {
    const success = addTrackToPlaylist(playlistId, track);
    if (success) {
      showToast(`Added to "${playlistName}"`);
    } else {
      showToast(`Already in "${playlistName}"`);
    }
  };

  const handleCreateAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    const created = createPlaylist(newPlaylistName);
    addTrackToPlaylist(created.id, track);
    setNewPlaylistName('');
    showToast(`Created "${created.name}" & added track`);
  };

  const handleAdminDownload = () => {
    if (!isAdmin) return;

    if (track.audioUrl) {
      // Create download trigger
      const a = document.createElement('a');
      a.href = track.audioUrl;
      a.target = '_blank';
      a.download = `${track.artist} - ${track.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Initiating admin song download…');
    } else {
      showToast('Audio URL unavailable for download');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-[#120d14] border border-white/15 rounded-3xl p-6 shadow-2xl space-y-5 text-white animate-in zoom-in-95 duration-200 relative overflow-hidden"
      >
        {/* Toast Overlay */}
        {toastMsg && (
          <div className="absolute inset-0 bg-[#120d14]/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-6 text-center space-y-2 animate-in fade-in">
            <span className="material-symbols-outlined text-4xl text-emerald-400">check_circle</span>
            <p className="font-bold text-sm text-white">{toastMsg}</p>
          </div>
        )}

        {/* Track Brief Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
          <img
            src={track.coverUrl}
            alt={track.title}
            className="w-12 h-12 rounded-xl object-cover border border-white/20 shadow-md flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-extrabold text-sm text-white truncate">{track.title}</h3>
            <p className="text-xs font-semibold text-zinc-400 truncate">{track.artist}</p>
          </div>
        </div>

        {/* Mode: ACTIONS */}
        {mode === 'ACTIONS' && (
          <div className="space-y-1">
            <button
              onClick={() => {
                playTrack(track);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold hover:bg-white/10 transition-colors text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl text-pink-400">play_arrow</span>
              <span>Play Now</span>
            </button>

            <button
              onClick={handlePlayNext}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold hover:bg-white/10 transition-colors text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl text-purple-400">queue_music</span>
              <span>Add to Queue</span>
            </button>

            <button
              onClick={() => setMode('SELECT_PLAYLIST')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold hover:bg-white/10 transition-colors text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl text-amber-400">playlist_add</span>
              <span>Add to Custom Playlist…</span>
            </button>

            {/* ADMIN ONLY DOWNLOAD OPTION */}
            {isAdmin ? (
              <button
                onClick={handleAdminDownload}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-colors text-left cursor-pointer mt-2"
              >
                <span className="material-symbols-outlined text-xl text-amber-400">download</span>
                <div className="flex-1">
                  <span>Download Track</span>
                  <span className="block text-[9px] text-amber-400/80 font-mono">[Admin Privileged Access]</span>
                </div>
              </button>
            ) : (
              <div className="px-4 py-2 text-[10px] text-zinc-500 font-mono flex items-center gap-1.5 border-t border-white/5 mt-2">
                <span className="material-symbols-outlined text-xs">lock</span>
                <span>Downloads restricted to Administrator role</span>
              </div>
            )}
          </div>
        )}

        {/* Mode: SELECT_PLAYLIST */}
        {mode === 'SELECT_PLAYLIST' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">
                Select Target Playlist
              </h4>
              <button
                onClick={() => setMode('CREATE_PLAYLIST')}
                className="text-xs font-bold text-pink-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>New</span>
              </button>
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1.5 no-scrollbar">
              {playlists.map((pl) => (
                <button
                  key={pl.id}
                  onClick={() => handleAddToPlaylist(pl.id, pl.name)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="material-symbols-outlined text-base text-pink-400">queue_music</span>
                    <span className="truncate">{pl.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{pl.tracks.length} tracks</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setMode('ACTIONS')}
              className="w-full text-center text-xs font-bold text-zinc-400 hover:text-white pt-2 cursor-pointer"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Mode: CREATE_PLAYLIST */}
        {mode === 'CREATE_PLAYLIST' && (
          <form onSubmit={handleCreateAndAdd} className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">
              Create New Custom Playlist
            </h4>

            <div>
              <label className="block text-[11px] font-bold text-zinc-300 mb-1">
                Playlist Name
              </label>
              <input
                type="text"
                required
                autoFocus
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="e.g. My Favorites, Workout Hits, Chill Beats"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white focus:outline-none focus:border-pink-500 placeholder:text-zinc-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setMode('SELECT_PLAYLIST')}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-zinc-300 hover:bg-white/20 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-xs font-bold text-white shadow-lg shadow-pink-600/30 hover:opacity-95 transition-all cursor-pointer"
              >
                Create & Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
