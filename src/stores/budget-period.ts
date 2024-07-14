import BudgetPeriod, {
  BudgetPeriodStoreActions,
  BudgetPeriodStoreValues,
} from '@/types/client/budget-period';
import { create } from 'zustand';

const useBudgetPeriodStore = create<
  BudgetPeriodStoreValues & BudgetPeriodStoreActions
>(set => ({
  budgetPeriod: undefined,
  setBudgetPeriod: (budgetPeriod: BudgetPeriod) => set({ budgetPeriod }),
  clearBudgetPeriod: () => set({ budgetPeriod: undefined }),
}));

export default useBudgetPeriodStore;
