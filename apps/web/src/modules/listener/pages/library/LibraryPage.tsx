import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MOCK_ALBUMS, MOCK_TRACKS } from '@/data/mockData';
import { AlbumCard } from '@/components/ui/AlbumCard';
import { TrackRow } from '@/components/ui/TrackRow';
import { PillButton } from '@/components/ui/PillButton';
import { usePlayerStore, Track } from '@/shared/player/usePlayerStore';
import { usePlaylistStore, UserPlaylist } from '@/shared/playlists/usePlaylistStore';

export const LibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'PLAYLISTS' | 'ALBUMS' | 'SAVED'>('PLAYLISTS');
  const [selectedPlaylist, setSelectedPlaylist] = useState<UserPlaylist | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');

  const { catalogTracks, loadCatalog, playTrack } = usePlayerStore();
  const { playlists, createPlaylist, deletePlaylist, removeTrackFromPlaylist } = usePlaylistStore();

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const libraryTracks = catalogTracks.length > 0 ? [...catalogTracks, ...MOCK_TRACKS] : MOCK_TRACKS;

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    const created = createPlaylist(newPlaylistName, newPlaylistDesc);
    setNewPlaylistName('');
    setNewPlaylistDesc('');
    setIsCreating(false);
    setSelectedPlaylist(created);
  };

  const handlePlayPlaylist = (playlist: UserPlaylist) => {
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0], playlist.tracks.slice(1));
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white">
            Your Library
          </h1>
          <p className="text-xs sm:text-sm text-[#5d3f40] dark:text-zinc-400 mt-1">
            Create custom playlists, save songs, organize your collection, and stream high-res audio.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-[#ffe9e9] dark:bg-white/10 p-1 rounded-full text-xs font-bold">
          {(['PLAYLISTS', 'ALBUMS', 'SAVED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedPlaylist(null);
              }}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === tab
                  ? 'premium-gradient text-white shadow-md'
                  : 'text-[#5d3f40] dark:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── 1. PLAYLISTS TAB ────────────────────────────────────────────── */}
      {activeTab === 'PLAYLISTS' && (
        <div className="space-y-6">
          {/* Create Modal / Form Bar */}
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-xl text-[#281718] dark:text-white">
              {selectedPlaylist ? selectedPlaylist.name : 'Custom Playlists'}
            </h2>

            {selectedPlaylist ? (
              <button
                onClick={() => setSelectedPlaylist(null)}
                className="text-xs font-bold text-[#ba0034] hover:underline cursor-pointer flex items-center gap-1"
              >
                ← Back to All Playlists
              </button>
            ) : (
              <PillButton
                variant="primary"
                glow
                onClick={() => setIsCreating(!isCreating)}
                className="text-xs"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>{isCreating ? 'Cancel' : 'Create New Playlist'}</span>
              </PillButton>
            )}
          </div>

          {/* New Playlist Form */}
          {isCreating && (
            <form
              onSubmit={handleCreatePlaylist}
              className="glass-panel p-6 rounded-3xl border border-[#ba0034]/30 space-y-4 animate-in fade-in"
            >
              <h3 className="font-bold text-sm text-[#281718] dark:text-white">
                Create Your New Library Playlist
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5d3f40] dark:text-zinc-300 mb-1">
                    Playlist Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="e.g. Work Focus, Favorite Bollywood, Night Drive"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9]/60 dark:bg-zinc-800 border border-[#e6bcbd] dark:border-zinc-700 text-xs font-semibold focus:outline-none focus:border-[#ba0034]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5d3f40] dark:text-zinc-300 mb-1">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={newPlaylistDesc}
                    onChange={(e) => setNewPlaylistDesc(e.target.value)}
                    placeholder="e.g. My favorite tracks added from the site"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#ffe9e9]/60 dark:bg-zinc-800 border border-[#e6bcbd] dark:border-zinc-700 text-xs font-semibold focus:outline-none focus:border-[#ba0034]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-[#5d3f40] hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Cancel
                </button>
                <PillButton type="submit" variant="primary" glow className="text-xs py-2 px-5">
                  Save Playlist
                </PillButton>
              </div>
            </form>
          )}

          {/* Selected Playlist Track View */}
          {selectedPlaylist ? (
            <div className="space-y-6">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#ba0034] to-pink-500 flex items-center justify-center text-white shadow-xl flex-shrink-0">
                    <span className="material-symbols-outlined text-4xl">queue_music</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#ba0034]">
                      Custom Playlist
                    </span>
                    <h3 className="font-extrabold text-2xl text-[#281718] dark:text-white">
                      {selectedPlaylist.name}
                    </h3>
                    <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
                      {selectedPlaylist.description || 'Created in Madhur Music'} · {selectedPlaylist.tracks.length} Tracks
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {selectedPlaylist.tracks.length > 0 && (
                    <PillButton
                      variant="primary"
                      glow
                      onClick={() => handlePlayPlaylist(selectedPlaylist)}
                    >
                      <span className="material-symbols-outlined text-lg">play_arrow</span>
                      <span>Play Playlist</span>
                    </PillButton>
                  )}
                  <button
                    onClick={() => {
                      if (confirm(`Delete playlist "${selectedPlaylist.name}"?`)) {
                        deletePlaylist(selectedPlaylist.id);
                        setSelectedPlaylist(null);
                      }
                    }}
                    className="p-2.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                    title="Delete Playlist"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>

              {/* Track list inside selected playlist */}
              <div className="space-y-3">
                {selectedPlaylist.tracks.length > 0 ? (
                  selectedPlaylist.tracks.map((track, idx) => (
                    <div key={track.id} className="relative group">
                      <TrackRow
                        track={track}
                        index={idx}
                        playlist={selectedPlaylist.tracks}
                      />
                    </div>
                  ))
                ) : (
                  <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
                    <span className="material-symbols-outlined text-4xl text-[#ba0034]/40">music_off</span>
                    <h4 className="font-bold text-base text-[#281718] dark:text-white">
                      Playlist is Empty
                    </h4>
                    <p className="text-xs text-[#5d3f40] max-w-sm mx-auto">
                      Click the 3 dots (<strong className="text-[#ba0034] font-mono">⋮</strong>) menu on any song across the site and select <strong>"Add to Custom Playlist…"</strong> to add songs here!
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Playlists Cards Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {playlists.map((pl) => (
                <div
                  key={pl.id}
                  onClick={() => setSelectedPlaylist(pl)}
                  className="glass-panel p-5 rounded-3xl border border-white/40 hover:border-[#ba0034]/50 transition-all duration-300 cursor-pointer space-y-4 group artist-glow"
                >
                  <div className="w-full h-36 rounded-2xl bg-gradient-to-tr from-[#ba0034] via-rose-500 to-purple-600 flex items-center justify-center text-white relative overflow-hidden shadow-md">
                    {pl.coverUrl ? (
                      <img src={pl.coverUrl} alt={pl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="material-symbols-outlined text-5xl">queue_music</span>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="w-12 h-12 rounded-full bg-[#ba0034] text-white flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-2xl">play_arrow</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-[#281718] dark:text-white truncate group-hover:text-[#ba0034] transition-colors">
                      {pl.name}
                    </h3>
                    <p className="text-xs text-[#5d3f40] dark:text-zinc-400 truncate mt-0.5">
                      {pl.description || `${pl.tracks.length} Tracks`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 2. ALBUMS TAB ─────────────────────────────────────────────── */}
      {activeTab === 'ALBUMS' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MOCK_ALBUMS.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              artist={album.artist}
              coverUrl={album.coverUrl}
              subtitle={`${album.trackCount} Tracks`}
              onClick={() => navigate(`/album/${album.id}`)}
            />
          ))}
        </div>
      )}

      {/* ── 3. SAVED TAB ──────────────────────────────────────────────── */}
      {activeTab === 'SAVED' && (
        <div className="space-y-3">
          {libraryTracks.map((track, idx) => (
            <TrackRow
              key={track.id}
              track={track}
              index={idx}
              playlist={libraryTracks}
            />
          ))}
        </div>
      )}
    </div>
  );
};
