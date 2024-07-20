'use client';

import { getResource } from '@/helpers/fetch';
import { useQuery } from '@tanstack/react-query';
import BudgetPieChart from './BudgetPieChart';
import useBudgetStore from '@/stores/budget';
import { useFormState } from 'react-dom';
import { createBudget } from '@/server-actions/budget';
import { useEffect } from 'react';

const initialState = {
  budget: undefined,
  error: null,
};

async function getBudget() {
  const { data } = await getResource(
    `${process.env.NEXT_PUBLIC_URL}/api/budgets/current`
  );
  return data;
}

export default function Container() {
  const [state, formAction] = useFormState(createBudget, initialState);
  const { budget, setBudget } = useBudgetStore(state => ({
    budget: state.budget,
    setBudget: state.setBudget,
  }));
  const { isLoading, error, data } = useQuery({
    queryKey: ['currentBudget'],
    queryFn: getBudget,
  });

  useEffect(() => {
    if (state.budget) {
      setBudget(state.budget);
    }
  }, [state]);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (state.error) return 'An error has occurred: ' + state.error;

  if (data.budget || budget) {
    return <BudgetPieChart budget={data.budget || budget} />;
  }

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="budget[month]"
        value={new Date().getMonth() + 1}
      />
      <input
        type="hidden"
        name="budget[year]"
        value={new Date().getFullYear()}
      />
      <button type="submit" name="submit">
        Create new budget!
      </button>
    </form>
  );
}
