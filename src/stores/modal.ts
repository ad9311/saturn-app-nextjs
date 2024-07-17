import { ModalStoreActions, ModalStoreValues } from '@/types/client/modal';
import { create } from 'zustand';

const useModalStore = create<ModalStoreValues & ModalStoreActions>(set => ({
  modalsIds: [],
  setModalId: id =>
    set(state => {
      if (state.modalsIds.includes(id)) return { modalsIds: state.modalsIds };
      return { modalsIds: [...state.modalsIds, id] };
    }),
  clearModalId: id =>
    set(state => {
      const modalsIds = state.modalsIds.filter(i => i !== id);
      return { modalsIds };
    }),
  clearModalsIds: () => set({ modalsIds: [] }),
}));

export default useModalStore;
