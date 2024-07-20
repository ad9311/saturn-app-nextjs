import { Budget, Income } from '@prisma/client';
import { FormErrors } from '..';

export type BudgetDb = Budget & {
  incomeList: Income[];
};

export type BudgetTemplate = {
  month: number;
  year: number;
};

export type CreateBudgetState = FormErrors & {
  budget: Budget | null;
};

export type BudgetStoreValues = {
  budget: BudgetDb | null;
};

export type BudgetStoreActions = {
  setBudget: (budget: BudgetDb) => void;
  clearBudget: () => void;
};
