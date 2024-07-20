import { ModalStoreActions, ModalStoreValues } from '@/types/modal';
import { create } from 'zustand';

export const useModalStore = create<ModalStoreValues & ModalStoreActions>(
  set => ({
    children: null,
    setChildren: children => set({ children }),
    clearChildren: () => set({ children: null }),
  })
);
