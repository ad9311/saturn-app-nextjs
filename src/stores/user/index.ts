import { UserStoreActions, UserStoreValues } from "@/types/user";
import { create } from "zustand";

export const useUserStore = create<UserStoreValues & UserStoreActions>(set => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
