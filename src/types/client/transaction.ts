import Budget from './budget';
import ExpenseCategory from './expense-category';

export type Transaction = {
  id: number;
  description: number;
  amount: number;
};

export type Income = Transaction;
export type Expense = Transaction & {
  expenseCategory: ExpenseCategory;
};

export type ResponseCreateTransaction = {
  budget: Budget | undefined;
};
