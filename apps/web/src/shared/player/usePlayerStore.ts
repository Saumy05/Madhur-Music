import { create } from 'zustand';
import { fetchSongs, recordSongPlay } from '../../data/songsApi';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  durationFormatted: string;
  audioUrl?: string;
  isSnippet?: boolean;
  lyrics?: string[];
  genre?: string;
  releaseYear?: number;
}

export type AudioMode = 'STANDARD' | 'DJ_MODE' | 'FOCUS_MODE' | 'HI_RES_SPATIAL';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number; // 0 to 1
  isMuted: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  queue: Track[];
  history: Track[];
  audioMode: AudioMode;
  isFullPlayerOpen: boolean;
  catalogTracks: Track[];

  // Actions
  playTrack: (track: Track, newQueue?: Track[]) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setQueue: (queue: Track[]) => void;
  addToQueue: (track: Track) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setAudioMode: (mode: AudioMode) => void;
  setFullPlayerOpen: (open: boolean) => void;
  toggleFullPlayer: () => void;
  loadCatalog: () => Promise<void>;
}

// ----------------------------------------------------
// Core Audio Engine State
// ----------------------------------------------------
let audioInstance: HTMLAudioElement | null = null;
let ytPlayerInstance: any = null;
let isYtReady = false;
let ytProgressInterval: any = null;

const getAudio = (set: any, get: any) => {
  if (typeof window === 'undefined') return null;
  if (!audioInstance) {
    audioInstance = new Audio();
    audioInstance.volume = get().volume;
    audioInstance.muted = get().isMuted;
    
    audioInstance.addEventListener('timeupdate', () => {
      if (audioInstance) set({ currentTime: audioInstance.currentTime });
    });

    audioInstance.addEventListener('durationchange', () => {
      if (audioInstance && !isNaN(audioInstance.duration)) {
        set({ duration: audioInstance.duration });
      }
    });

    audioInstance.addEventListener('ended', () => {
      const { isRepeat, nextTrack } = get();
      if (isRepeat && audioInstance) {
        audioInstance.currentTime = 0;
        audioInstance.play().catch(err => console.log('Audio playback error:', err));
      } else {
        nextTrack();
      }
    });

    audioInstance.addEventListener('play', () => {
      set({ isPlaying: true });
    });

    audioInstance.addEventListener('pause', () => {
      set({ isPlaying: false });
    });
  }
  return audioInstance;
};

// YouTube helpers
const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const isYouTubeUrl = (url?: string): boolean => {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const loadYtApi = () => {
  if (typeof window === 'undefined') return;
  if ((window as any).YT) {
    isYtReady = true;
    return;
  }
  
  let container = document.getElementById('yt-player-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'yt-player-container';
    container.style.position = 'absolute';
    container.style.width = '1px';
    container.style.height = '1px';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    container.style.opacity = '0';
    container.style.pointerEvents = 'none';
    
    const playerDiv = document.createElement('div');
    playerDiv.id = 'yt-player-placeholder';
    container.appendChild(playerDiv);
    document.body.appendChild(container);
  }

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

  (window as any).onYouTubeIframeAPIReady = () => {
    isYtReady = true;
  };
};

const startYtProgressTracker = (set: any, get: any) => {
  if (ytProgressInterval) clearInterval(ytProgressInterval);
  ytProgressInterval = setInterval(() => {
    if (ytPlayerInstance && ytPlayerInstance.getCurrentTime) {
      const currentTime = ytPlayerInstance.getCurrentTime();
      const duration = ytPlayerInstance.getDuration();
      set({
        currentTime: currentTime || 0,
        duration: duration || get().duration,
      });
    }
  }, 500);
};

const stopYtProgressTracker = () => {
  if (ytProgressInterval) {
    clearInterval(ytProgressInterval);
    ytProgressInterval = null;
  }
};

const getYTPlayer = (set: any, get: any): Promise<any> => {
  return new Promise((resolve) => {
    if (ytPlayerInstance) {
      resolve(ytPlayerInstance);
      return;
    }

    loadYtApi();

    const checkReady = setInterval(() => {
      if (isYtReady && (window as any).YT && (window as any).YT.Player) {
        clearInterval(checkReady);
        try {
          ytPlayerInstance = new (window as any).YT.Player('yt-player-placeholder', {
            height: '1',
            width: '1',
            videoId: '',
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            },
            events: {
              onStateChange: (event: any) => {
                const state = event.data;
                const YT_STATES = (window as any).YT.PlayerState;
                if (state === YT_STATES.PLAYING) {
                  set({ isPlaying: true });
                  startYtProgressTracker(set, get);
                } else if (state === YT_STATES.PAUSED) {
                  set({ isPlaying: false });
                } else if (state === YT_STATES.ENDED) {
                  stopYtProgressTracker();
                  const { isRepeat, nextTrack } = get();
                  if (isRepeat) {
                    ytPlayerInstance.seekTo(0, true);
                    ytPlayerInstance.playVideo();
                  } else {
                    nextTrack();
                  }
                }
              },
              onReady: () => {
                ytPlayerInstance.setVolume(get().volume * 100);
                if (get().isMuted) ytPlayerInstance.mute();
                resolve(ytPlayerInstance);
              }
            }
          });
        } catch (e) {
          console.error('Failed to create YouTube player:', e);
          resolve(null);
        }
      }
    }, 100);
  });
};

const mapBackendSongToTrack = (song: any): Track => ({
  id: song.id,
  title: song.title,
  artist: song.artist?.name || 'Unknown Artist',
  album: song.album?.title || 'Single',
  coverUrl: song.coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
  duration: song.durationSec,
  durationFormatted: `${Math.floor(song.durationSec / 60)}:${song.durationSec % 60 < 10 ? '0' : ''}${song.durationSec % 60}`,
  audioUrl: song.audioUrl,
});

const syncMediaSession = (track: Track | null, get: any) => {
  if (typeof window === 'undefined' || !('mediaSession' in navigator) || !track) return;

  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album || 'Madhur Music',
      artwork: [
        { src: track.coverUrl, sizes: '512x512', type: 'image/jpeg' },
      ],
    });

    navigator.mediaSession.setActionHandler('play', () => get().resume());
    navigator.mediaSession.setActionHandler('pause', () => get().pause());
    navigator.mediaSession.setActionHandler('previoustrack', () => get().previousTrack());
    navigator.mediaSession.setActionHandler('nexttrack', () => get().nextTrack());
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime !== undefined) get().seek(details.seekTime);
    });
  } catch (e) {
    /* MediaSession API error swallow */
  }
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: {
    id: 'tr-1',
    title: 'Midnight Echoes (Demo)',
    artist: 'Luna Ray',
    album: 'Studio Sessions',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    duration: 134,
    durationFormatted: '2:14',
    isSnippet: true,
    genre: 'Indie Pop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  isPlaying: false,
  currentTime: 0,
  duration: 134,
  volume: 0.8,
  isMuted: false,
  isShuffle: false,
  isRepeat: false,
  queue: [],
  history: [],
  audioMode: 'HI_RES_SPATIAL',
  isFullPlayerOpen: false,
  catalogTracks: [],

  playTrack: (track, newQueue) => {
    set({
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      duration: track.duration || 180,
      queue: newQueue || [],
    });

    syncMediaSession(track, get);

    // Record play count on backend if valid MongoDB ObjectId
    if (/^[0-9a-fA-F]{24}$/.test(track.id)) {
      recordSongPlay(track.id);
    }

    const isYT = isYouTubeUrl(track.audioUrl);

    if (isYT) {
      // Stop/Pause HTML5 Audio
      const audio = getAudio(set, get);
      if (audio) audio.pause();

      // Play YouTube
      const videoId = extractYouTubeId(track.audioUrl || '');
      if (videoId) {
        getYTPlayer(set, get).then((player) => {
          if (player) {
            player.loadVideoById(videoId);
            player.playVideo();
          }
        });
      }
    } else {
      // Pause YouTube
      if (ytPlayerInstance && ytPlayerInstance.pauseVideo) {
        ytPlayerInstance.pauseVideo();
        stopYtProgressTracker();
      }

      // Play HTML5 Audio
      const audio = getAudio(set, get);
      if (audio) {
        audio.src = track.audioUrl || '';
        audio.load();
        audio.play().catch(err => console.log('Audio playback error:', err));
      }
    }
  },
  togglePlay: () => {
    const { isPlaying, currentTrack } = get();
    if (!currentTrack) return;
    const isYT = isYouTubeUrl(currentTrack.audioUrl);

    if (isYT) {
      getYTPlayer(set, get).then((player) => {
        if (player) {
          if (isPlaying) {
            player.pauseVideo();
            stopYtProgressTracker();
          } else {
            player.playVideo();
          }
        }
      });
    } else {
      const audio = getAudio(set, get);
      if (audio) {
        if (isPlaying) {
          audio.pause();
        } else {
          if (!audio.src && currentTrack.audioUrl) {
            audio.src = currentTrack.audioUrl;
            audio.load();
          }
          audio.play().catch(err => console.log('Audio playback error:', err));
        }
      }
    }
  },
  pause: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    const isYT = isYouTubeUrl(currentTrack.audioUrl);

    if (isYT) {
      if (ytPlayerInstance && ytPlayerInstance.pauseVideo) {
        ytPlayerInstance.pauseVideo();
        stopYtProgressTracker();
      }
    } else {
      const audio = getAudio(set, get);
      if (audio) audio.pause();
    }
  },
  resume: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    const isYT = isYouTubeUrl(currentTrack.audioUrl);

    if (isYT) {
      if (ytPlayerInstance && ytPlayerInstance.playVideo) {
        ytPlayerInstance.playVideo();
      }
    } else {
      const audio = getAudio(set, get);
      if (audio && currentTrack) {
        if (!audio.src && currentTrack.audioUrl) {
          audio.src = currentTrack.audioUrl;
          audio.load();
        }
        audio.play().catch(err => console.log('Audio playback error:', err));
      }
    }
  },
  seek: (time) => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    const isYT = isYouTubeUrl(currentTrack.audioUrl);

    if (isYT) {
      if (ytPlayerInstance && ytPlayerInstance.seekTo) {
        ytPlayerInstance.seekTo(time, true);
      }
    } else {
      const audio = getAudio(set, get);
      if (audio) audio.currentTime = time;
    }
    set({ currentTime: time });
  },
  setVolume: (volume) => {
    const audio = getAudio(set, get);
    if (audio) audio.volume = volume;

    if (ytPlayerInstance && ytPlayerInstance.setVolume) {
      ytPlayerInstance.setVolume(volume * 100);
    }
    set({ volume, isMuted: volume === 0 });
  },
  toggleMute: () => {
    const { isMuted } = get();
    const audio = getAudio(set, get);
    if (audio) audio.muted = !isMuted;

    if (ytPlayerInstance && ytPlayerInstance.mute) {
      if (isMuted) {
        ytPlayerInstance.unMute();
      } else {
        ytPlayerInstance.mute();
      }
    }
    set({ isMuted: !isMuted });
  },
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
  setQueue: (queue) => set({ queue }),
  addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
  nextTrack: () => {
    const { queue, currentTrack } = get();
    if (queue.length > 0) {
      const next = queue[0];
      set({
        currentTrack: next,
        queue: queue.slice(1),
        history: currentTrack ? [...get().history, currentTrack] : get().history,
        currentTime: 0,
        isPlaying: true,
      });

      const isYT = isYouTubeUrl(next.audioUrl);
      if (isYT) {
        const audio = getAudio(set, get);
        if (audio) audio.pause();

        const videoId = extractYouTubeId(next.audioUrl || '');
        if (videoId) {
          getYTPlayer(set, get).then((player) => {
            if (player) {
              player.loadVideoById(videoId);
              player.playVideo();
            }
          });
        }
      } else {
        if (ytPlayerInstance && ytPlayerInstance.pauseVideo) {
          ytPlayerInstance.pauseVideo();
          stopYtProgressTracker();
        }

        const audio = getAudio(set, get);
        if (audio) {
          audio.src = next.audioUrl || '';
          audio.load();
          audio.play().catch(err => console.log('Audio playback error:', err));
        }
      }
    } else {
      if (ytPlayerInstance && ytPlayerInstance.pauseVideo) {
        ytPlayerInstance.pauseVideo();
        stopYtProgressTracker();
      }
      const audio = getAudio(set, get);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      set({ isPlaying: false, currentTime: 0 });
    }
  },
  previousTrack: () => {
    const { history, currentTrack } = get();
    if (history.length > 0) {
      const prev = history[history.length - 1];
      set({
        currentTrack: prev,
        history: history.slice(0, -1),
        queue: currentTrack ? [currentTrack, ...get().queue] : get().queue,
        currentTime: 0,
        isPlaying: true,
      });

      const isYT = isYouTubeUrl(prev.audioUrl);
      if (isYT) {
        const audio = getAudio(set, get);
        if (audio) audio.pause();

        const videoId = extractYouTubeId(prev.audioUrl || '');
        if (videoId) {
          getYTPlayer(set, get).then((player) => {
            if (player) {
              player.loadVideoById(videoId);
              player.playVideo();
            }
          });
        }
      } else {
        if (ytPlayerInstance && ytPlayerInstance.pauseVideo) {
          ytPlayerInstance.pauseVideo();
          stopYtProgressTracker();
        }

        const audio = getAudio(set, get);
        if (audio) {
          audio.src = prev.audioUrl || '';
          audio.load();
          audio.play().catch(err => console.log('Audio playback error:', err));
        }
      }
    } else {
      const { currentTrack: current } = get();
      if (!current) return;
      const isYT = isYouTubeUrl(current.audioUrl);
      if (isYT) {
        if (ytPlayerInstance && ytPlayerInstance.seekTo) {
          ytPlayerInstance.seekTo(0, true);
        }
      } else {
        const audio = getAudio(set, get);
        if (audio) audio.currentTime = 0;
      }
      set({ currentTime: 0 });
    }
  },
  setAudioMode: (audioMode) => set({ audioMode }),
  setFullPlayerOpen: (isFullPlayerOpen) => set({ isFullPlayerOpen }),
  toggleFullPlayer: () => set((state) => ({ isFullPlayerOpen: !state.isFullPlayerOpen })),
  loadCatalog: async () => {
    try {
      const backendSongs = await fetchSongs();
      const mapped = backendSongs.map(mapBackendSongToTrack);
      set({ catalogTracks: mapped });

      const current = get().currentTrack;
      if (mapped.length > 0 && (!current || current.id === 'tr-1')) {
        set({
          currentTrack: mapped[0],
          duration: mapped[0].duration || 180,
        });
      }
    } catch (e) {
      console.error('Failed to load catalog tracks in store:', e);
    }
  },
}));
