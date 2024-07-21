import { ExpenseCategory } from '@prisma/client';
import { FormErrors } from '..';

export type ExpenseCategoryDb = ExpenseCategory;

export type ExpenseCategoryTemplate = {
  name: string;
  color: string;
  budgetRecordId: number;
};

export type ExpenseCategoryFormState = FormErrors & {
  expense: ExpenseCategoryDb | null;
};
