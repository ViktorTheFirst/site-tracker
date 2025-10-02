import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { IUser } from '@/interfaces/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editUserAPI, getUsersAPI } from '@/api/user';

interface UserState {
  user: IUser | null;
  users: IUser[] | null;
  setUser: (user: IUser) => void;
  setUsers: (users: IUser[]) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      users: null,
      setUser: (user: IUser) => {
        console.log('Setting user in store:', user);
        set({ user });
      },
      setUsers: (users: IUser[]) => set({ users }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
      // saves user to localstorage and fetches it
      storage: createJSONStorage(() => localStorage),
      partialize: (state: UserState) => ({ user: state.user }),
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

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsersAPI,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Error updating user:', error);
    },
  });
};

export default useUserStore;
