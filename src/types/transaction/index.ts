import { Expense, Income } from '@prisma/client';
import { FormErrors } from '..';

export type IncomeDb = Income;

export type IncomeTemplate = {
  amount: number;
  description: string;
};

export type IncomeFormState = FormErrors & {
  income: IncomeDb | null;
};

export type ExpenseDb = Expense;

export type ExpenseTemplate = {
  amount: number;
  description: string;
  expenseCategoryId: number;
};

export type ExpenseFormState = FormErrors & {
  expense: ExpenseDb | null;
};
