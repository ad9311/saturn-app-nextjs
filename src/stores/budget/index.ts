import { BudgetStoreActions, BudgetStoreValues } from '@/types/budget';
import { create } from 'zustand';

export const useBudgetStore = create<BudgetStoreValues & BudgetStoreActions>(
  set => ({
    budget: null,
    setBudget: budget => set({ budget }),
    clearBudget: () => set({ budget: null }),
  })
);
