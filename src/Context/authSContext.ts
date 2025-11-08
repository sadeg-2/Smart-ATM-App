// src/store/authStore.js
import { create } from 'zustand';
import type { UserInfo } from '../Types/types';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: UserInfo | null;
  isAuth: boolean;
  login: (userData: UserInfo) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserInfo>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuth: false,
      login: (userData: UserInfo) => set({ user: userData, isAuth: true }),
      logout: () => set({ user: null, isAuth: false }),
      // ✅ new function to update user partially
      updateUser: (updates: Partial<UserInfo>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },
    }),

    {
      name: 'auth-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
