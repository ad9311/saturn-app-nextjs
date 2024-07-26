export type SlidingMenuStore = {
  open: boolean;
  setToggle: () => void;
};

export type FormErrors = {
  errors:
    | {
        message: string;
      }[]
    | null;
};
