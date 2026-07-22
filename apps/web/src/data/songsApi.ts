export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    email: string;
    role: string;
    avatarUrl?: string;
  };
}

export async function loginAdmin(username: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Invalid credentials');
  }
  return res.json();
}

// ─── Users ────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: 'USER' | 'ARTIST' | 'ADMIN';
  avatarUrl?: string;
  createdAt: string;
}

export interface CreateUserPayload {
  username: string;
  displayName: string;
  email: string;
  password: string;
  role?: 'USER' | 'ARTIST' | 'ADMIN';
  avatarUrl?: string;
}

export interface UpdateUserPayload {
  username?: string;
  displayName?: string;
  email?: string;
  password?: string;
  role?: 'USER' | 'ARTIST' | 'ADMIN';
  avatarUrl?: string;
}

function authHeaders(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export async function fetchUsers(token: string): Promise<AdminUser[]> {
  const res = await fetch(`${API_URL}/users`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUser(token: string, payload: CreateUserPayload): Promise<AdminUser> {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to create user');
  }
  return res.json();
}

export async function updateUser(token: string, id: string, payload: UpdateUserPayload): Promise<AdminUser> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update user');
  }
  return res.json();
}

export async function deleteUser(token: string, id: string): Promise<void> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete user');
}

// ─── Songs ────────────────────────────────────────────────────────────────────

export interface BackendSong {
  id: string;
  title: string;
  durationSec: number;
  audioUrl: string;
  coverUrl?: string;
  explicit: boolean;
  playsCount: number;
  artist?: { id: string; name: string };
  album?: { id: string; title: string };
  createdAt: string;
}

export interface CreateSongPayload {
  title: string;
  artistName: string;
  albumTitle?: string;
  durationSec: number;
  audioUrl: string;
  coverUrl?: string;
  explicit?: boolean;
}

export interface YoutubeTrackInfo {
  title: string;
  artist: string;
  durationSec: number;
  coverUrl: string;
  audioUrl: string;
  videoId: string;
}

export async function fetchYoutubeInfo(url: string): Promise<YoutubeTrackInfo> {
  const res = await fetch(
    `${API_URL}/songs/youtube-info?url=${encodeURIComponent(url)}`,
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch YouTube info');
  }
  return res.json();
}

export async function fetchSongs(userId?: string): Promise<BackendSong[]> {
  const params = new URLSearchParams();
  if (userId) params.set('userId', userId);
  const res = await fetch(`${API_URL}/songs?${params}`);
  if (!res.ok) throw new Error('Failed to fetch songs');
  return res.json();
}

export async function fetchPendingSongs(token: string): Promise<BackendSong[]> {
  const res = await fetch(`${API_URL}/songs/pending`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch pending songs');
  return res.json();
}

export interface SubmitSongPayload {
  youtubeUrl: string;
  playlistId?: string;
  submittedById?: string;
}

export async function submitSong(payload: SubmitSongPayload): Promise<{ song: BackendSong; message: string }> {
  const res = await fetch(`${API_URL}/songs/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message || 'Failed to submit song');
  }
  return res.json();
}

export async function approveSong(token: string, id: string): Promise<{ song: BackendSong; message: string }> {
  const res = await fetch(`${API_URL}/songs/${id}/approve`, {
    method: 'PATCH',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to approve song');
  return res.json();
}

export async function rejectSong(token: string, id: string): Promise<{ song: BackendSong; message: string }> {
  const res = await fetch(`${API_URL}/songs/${id}/reject`, {
    method: 'PATCH',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to reject song');
  return res.json();
}

// ─── Notifications ────────────────────────────────────────────────────────────

export interface AdminNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  songId: string;
  read: boolean;
  createdAt: string;
  song: BackendSong;
}

export async function fetchNotifications(token: string): Promise<AdminNotification[]> {
  const res = await fetch(`${API_URL}/notifications`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

export async function countUnreadNotifications(token: string): Promise<{ count: number }> {
  const res = await fetch(`${API_URL}/notifications/unread-count`, { headers: authHeaders(token) });
  if (!res.ok) return { count: 0 };
  return res.json();
}

export async function markNotificationRead(token: string, id: string): Promise<void> {
  await fetch(`${API_URL}/notifications/${id}/read`, {
    method: 'PATCH',
    headers: authHeaders(token),
  });
}


export async function createSong(token: string, payload: CreateSongPayload): Promise<BackendSong> {
  const res = await fetch(`${API_URL}/songs`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message || 'Failed to create song');
  }
  return res.json();
}

export async function deleteSong(token: string, id: string): Promise<void> {
  const res = await fetch(`${API_URL}/songs/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete song');
}

export async function recordSongPlay(id: string): Promise<void> {
  try {
    await fetch(`${API_URL}/songs/${id}/play`, { method: 'PATCH' });
  } catch {
    /* silent */
  }
}
