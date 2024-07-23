import { create } from 'zustand';

import { ExpenseCategoriesStore } from '@/types/expense-category';

export const useExpenseCategoriesStore = create<ExpenseCategoriesStore>(set => ({
  expenseCategories: [],
  setExpenseCategories: expenseCategories => set({ expenseCategories }),
  clearExpenseCategories: () => set({ expenseCategories: [] }),
  addExpenseCategory: expenseCategory =>
    set(state => {
      return {
        expenseCategories: [expenseCategory, ...state.expenseCategories],
      };
    }),
  updateExpenseCategory: expenseCategory =>
    set(state => {
      const expenseCategories = state.expenseCategories.filter(ec => ec.id !== expenseCategory.id);
      return {
        expenseCategories: [...expenseCategories, expenseCategory],
      };
    }),
  deleteExpenseCategory: expenseCategory =>
    set(state => {
      const expenseCategories = state.expenseCategories.filter(ec => ec.id !== expenseCategory.id);
      return {
        expenseCategories: [...expenseCategories],
      };
    }),
}));
