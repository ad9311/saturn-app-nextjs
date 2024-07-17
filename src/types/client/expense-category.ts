type ExpenseCategory = {
  id: number;
  name: string;
  color: string;
};

export type ExpenseCategoryStoreValues = {
  expenseCategories: ExpenseCategory[];
};

export type ExpenseCategoryStoreActions = {
  setExpenseCategories: (expenseCategories: ExpenseCategory[]) => void;
  clearExpenseCategories: () => void;
};

export default ExpenseCategory;
