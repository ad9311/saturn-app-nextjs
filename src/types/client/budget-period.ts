import { ExpenseTransaction, IncomeTransaction } from './transaction';

type BudgetPeriod = {
  uid: string;
  year: number;
  month: number;
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
  expenseCount: number;
  incomeCount: number;
  expenses?: ExpenseTransaction[];
  income?: IncomeTransaction[];
};

export type BudgetPeriodStoreValues = {
  budgetPeriod: BudgetPeriod | undefined;
};

export type BudgetPeriodStoreActions = {
  setBudgetPeriod: (budgetPeriod: BudgetPeriod) => void;
  clearBudgetPeriod: () => void;
};

export default BudgetPeriod;
