import { create } from 'zustand';

export type UserRole =
  | 'USER'
  | 'LISTENER'
  | 'ARTIST'
  | 'MUSIC_LABEL'
  | 'PODCAST_HOST'
  | 'EVENT_PROMOTER'
  | 'MODERATOR'
  | 'ADMIN'
  | 'ADMINISTRATOR';

export type SubscriptionPlan =
  | 'FREE'
  | 'BACKSTAGE_VIP'
  | 'STANDARD'
  | 'ARTIST_PRO'
  | 'PREMIUM'
  | 'ENTERPRISE'
  | 'BUSINESS'
  | 'INTERNAL';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  subscriptionPlan: SubscriptionPlan;
  isVip: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole, subscriptionPlan?: SubscriptionPlan) => void;
  signup: (name: string, email: string, role?: UserRole, subscriptionPlan?: SubscriptionPlan) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  setSubscription: (plan: SubscriptionPlan) => void;
  getRolePath: (role?: UserRole) => string;
}

const STORAGE_KEY = 'madhur_auth_state';

const getDefaultPlanForRole = (role: UserRole): SubscriptionPlan => {
  switch (role) {
    case 'ARTIST':
      return 'ARTIST_PRO';
    case 'MUSIC_LABEL':
      return 'ENTERPRISE';
    case 'PODCAST_HOST':
      return 'PREMIUM';
    case 'EVENT_PROMOTER':
      return 'BUSINESS';
    case 'MODERATOR':
    case 'ADMIN':
    case 'ADMINISTRATOR':
      return 'INTERNAL';
    case 'USER':
    case 'LISTENER':
    default:
      return 'BACKSTAGE_VIP';
  }
};

export const getRoleHomePath = (role?: UserRole): string => {
  switch (role) {
    case 'ARTIST':
      return '/artist/dashboard';
    case 'MUSIC_LABEL':
      return '/label/dashboard';
    case 'PODCAST_HOST':
      return '/podcast/dashboard';
    case 'EVENT_PROMOTER':
      return '/promoter/dashboard';
    case 'MODERATOR':
      return '/moderator/dashboard';
    case 'ADMIN':
    case 'ADMINISTRATOR':
      return '/admin/dashboard';
    case 'USER':
    case 'LISTENER':
    default:
      return '/listener';
  }
};

// Helper to safely load initial session from localStorage
const loadInitialState = (): { user: AuthUser | null; isAuthenticated: boolean } => {
  if (typeof window === 'undefined') return { user: null, isAuthenticated: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, isAuthenticated: false };
    const parsed = JSON.parse(raw);
    if (parsed && parsed.user && parsed.isAuthenticated) {
      return { user: parsed.user, isAuthenticated: true };
    }
  } catch {
    /* parse error fallback */
  }
  return { user: null, isAuthenticated: false };
};

// Safe helper to save to localStorage
const saveStateToStorage = (user: AuthUser | null, isAuthenticated: boolean) => {
  if (typeof window === 'undefined') return;
  if (user && isAuthenticated) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, isAuthenticated }));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const useAuthStore = create<AuthState>((set, get) => {
  const initial = loadInitialState();

  return {
    user: initial.user,
    isAuthenticated: initial.isAuthenticated,

    login: (email, role = 'USER', subscriptionPlan) => {
      const defaultPlan = getDefaultPlanForRole(role);
      const newUser: AuthUser = {
        id: 'usr-' + Date.now(),
        name: email.split('@')[0],
        email,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        role,
        subscriptionPlan: subscriptionPlan || defaultPlan,
        isVip: true,
      };
      saveStateToStorage(newUser, true);
      set({ user: newUser, isAuthenticated: true });
    },

    signup: (name, email, role = 'USER', subscriptionPlan) => {
      const defaultPlan = getDefaultPlanForRole(role);
      const newUser: AuthUser = {
        id: 'usr-' + Date.now(),
        name,
        email,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        role,
        subscriptionPlan: subscriptionPlan || defaultPlan,
        isVip: true,
      };
      saveStateToStorage(newUser, true);
      set({ user: newUser, isAuthenticated: true });
    },

    logout: () => {
      saveStateToStorage(null, false);
      set({ user: null, isAuthenticated: false });
    },

    setRole: (role) =>
      set((state) => {
        if (!state.user) return state;
        const updatedUser = {
          ...state.user,
          role,
          subscriptionPlan: getDefaultPlanForRole(role),
        };
        saveStateToStorage(updatedUser, state.isAuthenticated);
        return { user: updatedUser };
      }),

    setSubscription: (subscriptionPlan) =>
      set((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, subscriptionPlan };
        saveStateToStorage(updatedUser, state.isAuthenticated);
        return { user: updatedUser };
      }),

    getRolePath: (role) => getRoleHomePath(role || get().user?.role),
  };
});
