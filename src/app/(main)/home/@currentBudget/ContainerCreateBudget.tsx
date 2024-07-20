'use client';

import { postResource } from '@/helpers/fetch';
import useBudgetStore from '@/stores/budget';
import { useMutation } from '@tanstack/react-query';
import BudgetInfo from './BudgetPieChart';

type NewBudgetData = {
  month: number;
  year: number;
};

async function postBudget(newBudgetData: NewBudgetData) {
  const body = JSON.stringify(newBudgetData);
  const { data } = await postResource(
    `${process.env.NEXT_PUBLIC_URL}/api/budgets`,
    body
  );
  return data;
}

export default function ContainerCreateBudget() {
  const { budget, setBudget } = useBudgetStore(state => ({
    budget: state.budget,
    setBudget: state.setBudget,
  }));
  const { mutate } = useMutation({
    mutationFn: postBudget,
    mutationKey: ['budget'],
    onSuccess: data => setBudget(data.budget),
  });

  function handleCreate() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    mutate({ month, year });
  }

  if (budget) {
    <BudgetInfo budget={budget} />;
  }

  return (
    <button type="button" onClick={handleCreate}>
      CREATE!
    </button>
  );
}
