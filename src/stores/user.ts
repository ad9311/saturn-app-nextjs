import User, { UserStoreActions, UserStoreValues } from '@/types/client/user';
import { create } from 'zustand';

const useUserStore = create<UserStoreValues & UserStoreActions>(set => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: undefined }),
}));

export default useUserStore;
