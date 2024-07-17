export type ModalStoreValues = {
  children: React.ReactNode;
};

export type ModalStoreActions = {
  setChildren: (children: React.ReactNode) => void;
  clearChildren: () => void;
};
