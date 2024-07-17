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
  budgets: Budget[];
};

export type BudgetStoreActions = {
  setBudget: (budget: Budget) => void;
  setBudgets: (budgets: Budget[]) => void;
  clearBudget: () => void;
  clearBudgets: () => void;
  addIncome: (income: Income) => void;
  addExpense: (expense: Expense) => void;
};

export default Budget;
