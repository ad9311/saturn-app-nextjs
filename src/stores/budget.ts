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
  addIncome: income =>
    set(state => {
      if (state.budget && state.budget.incomeList) {
        const incomeList = [income, ...state.budget.incomeList];
        const budget = state.budget;
        budget.incomeList = incomeList;
        return { budget };
      }

      return state;
    }),
}));

export default useBudgetStore;
