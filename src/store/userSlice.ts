import { create } from 'zustand';

import type { IUser } from '@/interfaces/user';

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  getUser: () => IUser | null;
  clearUser: () => void;
}

const useUserStore = create<UserState>()((set, get) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
  getUser: () => get().user,
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
