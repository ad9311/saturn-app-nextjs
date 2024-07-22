import { create } from 'zustand';

import { ModalStoreActions, ModalStoreValues } from '@/types/modal';

export const useModalStore = create<ModalStoreValues & ModalStoreActions>(set => ({
  children: null,
  setChildren: children => set({ children }),
  clearChildren: () => set({ children: null }),
}));
