import { ExpenseCategory } from '@prisma/client';
import { FormErrors } from '..';

export type ExpenseCategoryDb = ExpenseCategory;

export type ExpenseCategoryTemplate = {
  name: string;
  color: string;
  budgetRecordId: number;
};

export type ExpenseCategoryFormState = FormErrors & {
  expenseCategory: ExpenseCategoryDb | null;
};

export type ExpenseCategoriesStoreValues = {
  expenseCategories: ExpenseCategoryDb[];
};

export type ExpenseCategoriesStoreActions = {
  setExpenseCategories: (expenseCategories: ExpenseCategoryDb[]) => void;
  clearExpenseCategories: () => void;
  addExpenseCategory: (expenseCategory: ExpenseCategoryDb) => void;
};
