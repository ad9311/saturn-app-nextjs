import { create } from 'zustand';

import { UserStoreActions, UserStoreValues } from '@/types/user';

export const useUserStore = create<UserStoreValues & UserStoreActions>(set => ({
  user: null,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
}));
