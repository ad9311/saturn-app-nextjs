'use client';

import { useExpenseCategoriesStore } from '@/stores/expense-categories';

import UpdateExpenseCategoryButton from './UpdateExpenseCategoryButton';

export default function ExpenseCategoryList() {
  const { expenseCategories } = useExpenseCategoriesStore(state => ({
    expenseCategories: state.expenseCategories,
  }));
  const mappedExpenses = expenseCategories.map(expenseCategory => (
    <li key={expenseCategory.id}>
      <div className="grid grid-cols-12 items-center">
        <p className="col-span-3">{expenseCategory.name}</p>
        <div className="col-span-3">
          <span
            className="inline-block w-3 h-3"
            style={{ backgroundColor: expenseCategory.color }}
          />
        </div>
        <UpdateExpenseCategoryButton expenseCategory={expenseCategory} />
      </div>
    </li>
  ));

  return <ul>{mappedExpenses}</ul>;
}
