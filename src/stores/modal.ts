import { ModalStoreActions, ModalStoreValues } from '@/types/client/modal';
import { create } from 'zustand';

const useModalStore = create<ModalStoreValues & ModalStoreActions>(set => ({
  id: '',
  setId: id => set({ id }),
  clearId: () => set({ id: '' }),
}));

export default useModalStore;
