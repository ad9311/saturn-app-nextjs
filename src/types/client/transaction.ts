export type Transaction = {
  id: number;
  description: number;
  amount: number;
};

export type ExpenseCategory = {
  name: string;
  color: string;
}

export type IncomeTransaction = Transaction;
export type ExpenseTransaction = Transaction & {
  category: ExpenseCategory;
};
