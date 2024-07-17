import { Expense, Income } from './transaction';

type Budget = {
  uid: number;
  year: number;
  month: number;
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
  expenseCount: number;
  incomeCount: number;
  expenses?: Expense[];
  incomeList?: Income[];
};

export type BudgetStoreValues = {
  budget: Budget | undefined;
};

export type BudgetStoreActions = {
  setBudget: (budget: Budget) => void;
  clearBudget: () => void;
};

export default Budget;
