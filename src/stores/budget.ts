import Budget, {
  BudgetStoreActions,
  BudgetStoreValues,
} from '@/types/client/budget';
import { create } from 'zustand';

const useBudgetStore = create<BudgetStoreValues & BudgetStoreActions>(set => ({
  budget: undefined,
  budgets: [],
  setBudget: (budget: Budget) => set({ budget }),
  setBudgets: (budgets: Budget[]) => set({ budgets }),
  clearBudget: () => set({ budget: undefined }),
  clearBudgets: () => set({ budgets: [] }),
  updateBudget: (budget) => set({ budget })
}));

export default useBudgetStore;
