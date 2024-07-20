'use client';

import { useBudgetStore } from '@/stores/budget';
import { BudgetDb } from '@/types/budget';
import { useEffect } from 'react';

export default function SaveBudgetToStore({ budget }: { budget: BudgetDb }) {
  const { setBudget } = useBudgetStore(state => ({
    setBudget: state.setBudget,
  }));

  useEffect(() => {
    if (budget) setBudget(budget);
  }, []);

  return null;
}
