import { create } from 'zustand';

import { BudgetStore } from '@/types/budget';

export const useBudgetStore = create<BudgetStore>(set => ({
  budget: null,
  setBudget: budget => set({ budget }),
  clearBudget: () => set({ budget: null }),
}));
