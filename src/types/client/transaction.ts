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

export type ResponseCreateIncome = {
  income: Income | undefined
};

export type ResponseCreateExpense = {
  expense: Expense | undefined
};
