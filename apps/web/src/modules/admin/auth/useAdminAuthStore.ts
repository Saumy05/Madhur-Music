import { create } from 'zustand';

interface AdminAuthState {
  token: string | null;
  adminUser: {
    id: string;
    username: string;
    displayName: string;
    email: string;
    role: string;
  } | null;
  setSession: (token: string, user: AdminAuthState['adminUser']) => void;
  clearSession: () => void;
}

const TOKEN_KEY = 'madhur_admin_token';
const USER_KEY = 'madhur_admin_user';

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  adminUser: (() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })(),

  setSession: (token, adminUser) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(adminUser));
    set({ token, adminUser });
  },

  clearSession: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ token: null, adminUser: null });
  },
}));
