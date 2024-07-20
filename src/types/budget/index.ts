import { Budget, Income } from '@prisma/client';

export type BudgetDb = Budget & {
  incomeList: Income[];
};

export type BudgetTemplate = {
  month: number;
  year: number;
};

export type CreateBudgetState = {
  budget: Budget | null;
  error: {
    message: string;
  } | null;
};

export type BudgetStoreValues = {
  budget: BudgetDb | null;
}

export type BudgetStoreActions = {
  setBudget: (budget: BudgetDb) => void;
  clearBudget: () => void;
}
