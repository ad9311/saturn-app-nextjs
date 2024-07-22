'use client';

import { useEffect } from 'react';

import { useBudgetStore } from '@/stores/budget';
import { useExpenseCategoriesStore } from '@/stores/expense-categories';
import { BudgetDb } from '@/types/budget';
import { ExpenseCategoryDb } from '@/types/expense-category';

export default function SavePageDataToStore({
  budget,
  expenseCategories,
}: {
  budget: BudgetDb;
  expenseCategories: ExpenseCategoryDb[];
}) {
  const { setBudget } = useBudgetStore(state => ({
    setBudget: state.setBudget,
  }));
  const { setExpenseCategories } = useExpenseCategoriesStore(state => ({
    setExpenseCategories: state.setExpenseCategories,
  }));

  useEffect(() => {
    if (budget) {
      setBudget(budget);
    }
    if (expenseCategories.length > 0) {
      setExpenseCategories(expenseCategories);
    }
  }, []);

  return null;
}
