import { Budget } from '@prisma/client';

export type BudgetDB = {
  month: number;
  year: number;
};

export type BudgetStoreValues = {
  budget: Budget | undefined;
};

export type BudgetStoreActions = {
  setBudget: (budget: Budget) => void;
  clearBudget: () => void;
};

export type CreateBudgetState = {
  budget: Budget | undefined | null;
  error: string | null;
}
