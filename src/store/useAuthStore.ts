import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser, LoginCredentials, RegisterCredentials } from '@/types';
import { api } from '@/lib/api';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  clearError: () => void;
}

interface AuthApiResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const data = await api.post<AuthApiResponse>('/auth/login', credentials);
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoading: false,
          });
        } catch (err) {
          const message = err instanceof Error
            ? err.message
            : (err as { message?: string })?.message ?? 'Login failed';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      register: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const data = await api.post<AuthApiResponse>('/auth/register', credentials);
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoading: false,
          });
        } catch (err) {
          const message = err instanceof Error
            ? err.message
            : (err as { message?: string })?.message ?? 'Registration failed';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          if (get().accessToken) {
            await api.post('/auth/logout');
          }
        } catch {
          // Ignore logout errors
        } finally {
          set({ user: null, accessToken: null, refreshToken: null, isLoading: false });
        }
      },

      fetchMe: async () => {
        if (!get().accessToken) return;
        set({ isLoading: true });
        try {
          const user = await api.get<AuthUser>('/auth/me');
          set({ user, isLoading: false });
        } catch {
          set({ user: null, accessToken: null, refreshToken: null, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'positivus-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
