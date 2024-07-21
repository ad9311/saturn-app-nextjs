import { create } from 'zustand';

import {
  ExpenseCategoriesStoreActions,
  ExpenseCategoriesStoreValues,
} from '@/types/expense-category';

export const useExpenseCategoriesStore = create<
  ExpenseCategoriesStoreValues & ExpenseCategoriesStoreActions
>(set => ({
  expenseCategories: [],
  setExpenseCategories: expenseCategories => set({ expenseCategories }),
  clearExpenseCategories: () => set({ expenseCategories: [] }),
  addExpenseCategory: expenseCategory =>
    set(state => {
      return {
        expenseCategories: [expenseCategory, ...state.expenseCategories],
      };
    }),
}));
