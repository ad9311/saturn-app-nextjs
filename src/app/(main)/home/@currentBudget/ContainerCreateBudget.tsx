'use client';

import { postResource } from '@/helpers/fetch';
import { useMutation } from '@tanstack/react-query';

type NewBudgetData = {
  month: number;
  year: number;
};

async function postBudget(newBudgetData: NewBudgetData) {
  const body = JSON.stringify(newBudgetData);
  return postResource(`${process.env.NEXT_PUBLIC_URL}/api/budgets`, body);
}

export default function ContainerCreateBudget() {
  const { mutate } = useMutation({
    mutationFn: postBudget,
    mutationKey: ['budget'],
    onSuccess: data => console.log(data),
  });

  function handleCreate() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    mutate({ month, year });
  }

  return (
    <button type="button" onClick={handleCreate}>
      CREATE!
    </button>
  );
}
