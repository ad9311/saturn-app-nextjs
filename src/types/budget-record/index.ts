import { Budget, BudgetRecord } from '@prisma/client';

export type BudgetRecordDb = BudgetRecord & {
  budgets: Budget[];
};

export type BudgetStoreValues = {
  budgetRecord: BudgetRecordDb | null;
};

export type BudgetRecordStoreActions = {
  setBudgetRecord: (budgetRecord: BudgetRecordDb) => void;
  clearBudgetRecord: () => void;
};
