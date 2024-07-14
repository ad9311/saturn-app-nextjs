import { ExpenseTransaction } from "./transaction";

export type BudgetPeriod = {
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
};
