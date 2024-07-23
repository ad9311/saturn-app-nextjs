'use client';

import { useExpenseCategoriesStore } from '@/stores/expense-categories';

import DeleteExpenseCategoryButton from './DeleteExpenseCategoryButton';
import UpdateExpenseCategoryButton from './UpdateExpenseCategoryButton';

export default function ExpenseCategoryList() {
  const { expenseCategories } = useExpenseCategoriesStore(state => ({
    expenseCategories: state.expenseCategories,
  }));
  const mappedExpenses = expenseCategories.map(expenseCategory => (
    <li key={expenseCategory.id}>
      <div className="flex items-center justify-between">
        <p>{expenseCategory.name}</p>
        <span className="inline-block w-3 h-3" style={{ backgroundColor: expenseCategory.color }} />
        <UpdateExpenseCategoryButton expenseCategory={expenseCategory} />
        <DeleteExpenseCategoryButton expenseCategory={expenseCategory} />
      </div>
    </li>
  ));

  return <ul>{mappedExpenses}</ul>;
}
