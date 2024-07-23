import { create } from 'zustand';

import { ModalStore } from '@/types/modal';

export const useModalStore = create<ModalStore>(set => ({
  children: null,
  setModal: children => set({ children }),
  clearModal: () => set({ children: null }),
}));
