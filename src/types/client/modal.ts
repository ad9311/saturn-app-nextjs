export type ModalStoreValues = {
  id: string;
};

export type ModalStoreActions = {
  setId: (id: string) => void;
  clearId: () => void;
};
