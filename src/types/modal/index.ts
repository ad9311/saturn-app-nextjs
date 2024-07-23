export type ModalStore = {
  children: React.ReactNode;
  setModal: (children: React.ReactNode) => void;
  clearModal: () => void;
};
