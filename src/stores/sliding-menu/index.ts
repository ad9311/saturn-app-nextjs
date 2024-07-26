import { create } from 'zustand';

import { SlidingMenuStore } from '@/types';

export const useSlidingMenuStore = create<SlidingMenuStore>(set => ({
  open: false,
  setToggle: () => set(state => ({ open: !state.open })),
}));
