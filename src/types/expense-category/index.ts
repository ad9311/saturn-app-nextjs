import { ExpenseCategory } from '@prisma/client';

import { FormErrors } from '..';

export type ExpenseCategoryDb = ExpenseCategory;

export type ExpenseCategoryTemplate = {
  name: string;
  color: string;
};

export type ExpenseCategoryFormState = FormErrors & {
  expenseCategory: ExpenseCategoryDb | null;
};

export type ExpenseCategoriesStore = {
  expenseCategories: ExpenseCategoryDb[];
  setExpenseCategories: (expenseCategories: ExpenseCategoryDb[]) => void;
  clearExpenseCategories: () => void;
  addExpenseCategory: (expenseCategory: ExpenseCategoryDb) => void;
  updateExpenseCategory: (expenseCategory: ExpenseCategoryDb) => void;
};
