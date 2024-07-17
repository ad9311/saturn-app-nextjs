import {
  BudgetStoreActions,
  BudgetStoreValues,
} from '@/types/client/budget';
import { create } from 'zustand';

const useBudgetStore = create<BudgetStoreValues & BudgetStoreActions>(set => ({
  budget: undefined,
  setBudget: budget => set({ budget }),
  clearBudget: () => set({ budget: undefined }),
}));

export default useBudgetStore;
