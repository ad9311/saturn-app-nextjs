import Budget, {
  BudgetStoreActions,
  BudgetStoreValues,
} from '@/types/client/budget';
import { create } from 'zustand';

const useBudgetStore = create<
  BudgetStoreValues & BudgetStoreActions
>(set => ({
  budget: undefined,
  setBudget: (budget: Budget) => set({ budget }),
  clearBudget: () => set({ budget: undefined }),
}));

export default useBudgetStore;
