/**
 * Zustand User Store
 * Global state management for user authentication
 */

import { create } from 'zustand';

interface UserState {
  userId: string | null;
  userRole: string | null;
  userName: string | null;
  isAdmin: boolean;
  isInitialized: boolean;

  setUser: (userId: string, userRole: string, userName: string) => void;
  clearUser: () => void;
  setRole: (role: string) => void;
  initialize: (userId: string | null, userRole: string | null, userName: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  userRole: null,
  userName: null,
  isAdmin: false,
  isInitialized: false,

  setUser: (userId: string, userRole: string, userName: string) =>
    set({
      userId,
      userRole,
      userName,
      isAdmin: userRole === 'ADMIN',
      isInitialized: true,
    }),

  clearUser: () =>
    set({
      userId: null,
      userRole: null,
      userName: null,
      isAdmin: false,
      isInitialized: false,
    }),

  setRole: (role: string) =>
    set({
      userRole: role,
      isAdmin: role === 'ADMIN',
    }),

  initialize: (userId: string | null, userRole: string | null, userName: string | null) =>
    set({
      userId,
      userRole,
      userName,
      isAdmin: userRole === 'ADMIN',
      isInitialized: true,
    }),
}));
