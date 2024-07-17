export type ModalStoreValues = {
  modalsIds: string[];
};

export type ModalStoreActions = {
  setModalId: (id: string) => void;
  clearModalId: (id: string) => void;
  clearModalsIds: () => void;
};
