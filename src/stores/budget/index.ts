import { create } from 'zustand';

import { BudgetStoreActions, BudgetStoreValues } from '@/types/budget';

export const useBudgetStore = create<BudgetStoreValues & BudgetStoreActions>(
  set => ({
    budget: null,
    setBudget: budget => set({ budget }),
    clearBudget: () => set({ budget: null }),
  })
);
