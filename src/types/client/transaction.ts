export type Transaction = {
  id: number;
  description: number;
  amount: number;
};

export type ExpenseCategory = {
  name: string;
  color: string;
};

export type Income = Transaction;
export type Expense = Transaction & {
  category: ExpenseCategory;
};
