import { create } from 'zustand';
import { Track } from '@/shared/player/usePlayerStore';

export interface UserPlaylist {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  createdAt: string;
  tracks: Track[];
}

interface PlaylistState {
  playlists: UserPlaylist[];
  createPlaylist: (name: string, description?: string) => UserPlaylist;
  addTrackToPlaylist: (playlistId: string, track: Track) => boolean;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  deletePlaylist: (playlistId: string) => void;
}

const STORAGE_KEY = 'madhur_user_playlists';

const loadPlaylistsFromStorage = (): UserPlaylist[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* fallback */
  }
  // Default starter playlist for new users
  return [
    {
      id: 'pl-favorites',
      name: 'My Favorite Tracks',
      description: 'Handpicked favorites from Madhur ecosystem',
      createdAt: new Date().toISOString(),
      tracks: [],
    },
  ];
};

const savePlaylistsToStorage = (playlists: UserPlaylist[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
};

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  playlists: loadPlaylistsFromStorage(),

  createPlaylist: (name: string, description?: string) => {
    const newPlaylist: UserPlaylist = {
      id: 'pl-' + Date.now(),
      name: name.trim(),
      description: description?.trim() || undefined,
      createdAt: new Date().toISOString(),
      tracks: [],
    };
    const updated = [newPlaylist, ...get().playlists];
    savePlaylistsToStorage(updated);
    set({ playlists: updated });
    return newPlaylist;
  },

  addTrackToPlaylist: (playlistId: string, track: Track) => {
    const playlists = get().playlists;
    let added = false;

    const updated = playlists.map((pl) => {
      if (pl.id === playlistId) {
        // Check if track is already in playlist
        const exists = pl.tracks.some((t) => t.id === track.id);
        if (exists) return pl;

        added = true;
        const newTracks = [...pl.tracks, track];
        return {
          ...pl,
          tracks: newTracks,
          coverUrl: pl.coverUrl || track.coverUrl, // use first track's art as playlist cover
        };
      }
      return pl;
    });

    if (added) {
      savePlaylistsToStorage(updated);
      set({ playlists: updated });
    }
    return added;
  },

  removeTrackFromPlaylist: (playlistId: string, trackId: string) => {
    const updated = get().playlists.map((pl) => {
      if (pl.id === playlistId) {
        return {
          ...pl,
          tracks: pl.tracks.filter((t) => t.id !== trackId),
        };
      }
      return pl;
    });
    savePlaylistsToStorage(updated);
    set({ playlists: updated });
  },

  deletePlaylist: (playlistId: string) => {
    const updated = get().playlists.filter((pl) => pl.id !== playlistId);
    savePlaylistsToStorage(updated);
    set({ playlists: updated });
  },
}));
