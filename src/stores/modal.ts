import { ModalStoreActions, ModalStoreValues } from '@/types/client/modal';
import { create } from 'zustand';

const useModalStore = create<ModalStoreValues & ModalStoreActions>(set => ({
  children: null,
  setChildren: children => set({ children }),
  clearChildren: () => set({ children: null }),
}));

export default useModalStore;
