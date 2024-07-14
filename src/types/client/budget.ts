import { ExpenseTransaction, IncomeTransaction } from './transaction';

type Budget = {
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

export type BudgetStoreValues = {
  budget: Budget | undefined;
  budgets: Budget[];
};

export type BudgetStoreActions = {
  setBudget: (budget: Budget) => void;
  setBudgets: (budgets: Budget[]) => void;
  clearBudget: () => void;
  clearBudgets: () => void;
};

export default Budget;
