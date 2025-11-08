// src/store/authStore.ts
import { create } from 'zustand';
import type { UserInfo } from '../Types/types';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: UserInfo | null;
  isAuth: boolean;
  login: (userData: UserInfo) => void;
  logout: () => void;
  updateUser: (newData: Partial<UserInfo>) => void; // ✅ new function
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuth: false,

      // login
      login: (userData: UserInfo) => set({ user: userData, isAuth: true }),

      // logout
      logout: () => set({ user: null, isAuth: false }),

      // ✅ update user info
      updateUser: (newData: Partial<UserInfo>) => {
        const currentUser = get().user;
        if (!currentUser) return; // no user logged in
        set({ user: { ...currentUser, ...newData } });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
