'use client';

import { getResource, postResource } from '@/helpers/fetch';
import { useMutation, useQuery } from '@tanstack/react-query';
import BudgetPieChart from './BudgetPieChart';
import useBudgetStore from '@/stores/budget';

type NewBudgetData = {
  month: number;
  year: number;
};

async function getBudget() {
  return getResource(`${process.env.NEXT_PUBLIC_URL}/api/budgets/current`);
}

async function postBudget(newBudgetData: NewBudgetData) {
  const body = JSON.stringify(newBudgetData);
  return postResource(`${process.env.NEXT_PUBLIC_URL}/api/budgets`, body);
}

export default function Container() {
  const { budget, setBudget } = useBudgetStore(state => ({
    budget: state.budget,
    setBudget: state.setBudget,
  }));
  const { isLoading, error, data } = useQuery({
    queryKey: ['currentBudget'],
    queryFn: getBudget,
  });
  const mutation = useMutation({
    mutationFn: postBudget,
    mutationKey: ['budget'],
    onSuccess: data => {
      setBudget(data.budget);
    },
  });

  function handleCreate() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    mutation.mutate({ month, year });
  }

  if (isLoading || mutation.isPending) return 'Loading...';

  if (error || mutation.error)
    return (
      'An error has occurred: ' + (error?.message || mutation.error?.message)
    );

  if (data.budget || budget) {
    return <BudgetPieChart budget={data.budget || budget} />;
  }

  return (
    <button type="button" onClick={handleCreate}>
      CREATE!
    </button>
  );
}
