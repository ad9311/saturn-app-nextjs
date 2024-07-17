import {
  ExpenseCategoryStoreActions,
  ExpenseCategoryStoreValues,
} from '@/types/client/expense-category';
import { create } from 'zustand';

const useExpenseCategoryStore = create<
  ExpenseCategoryStoreValues & ExpenseCategoryStoreActions
>(set => ({
  expenseCategories: [],
  setExpenseCategories: expenseCategories => set({ expenseCategories }),
  clearExpenseCategories: () => set({ expenseCategories: [] }),
}));

export default useExpenseCategoryStore;
