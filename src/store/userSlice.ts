import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { IUser } from '@/interfaces/user';

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: IUser) => {
        console.log('Setting user in store:', user);
        set({ user });
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
      /* onRehydrateStorage: (state) => {
        console.log('Zustand: Starting to rehydrate', state);
        return (state, error) => {
          if (error) {
            console.log('Zustand: Error during rehydration', error);
          } else {
            console.log('Zustand: Rehydration complete', state);
          }
        };
      }, */
    }
  )
);

export default useUserStore;
