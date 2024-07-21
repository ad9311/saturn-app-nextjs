import {
  ExpenseCategoriesStoreActions,
  ExpenseCategoriesStoreValues,
} from '@/types/expense-category';
import { create } from 'zustand';

export const useExpenseCategoriesStore = create<
  ExpenseCategoriesStoreValues & ExpenseCategoriesStoreActions
>(set => ({
  expenseCategories: [],
  setExpenseCategories: expenseCategories => set({ expenseCategories }),
  clearExpenseCategories: () => set({ expenseCategories: [] }),
}));
