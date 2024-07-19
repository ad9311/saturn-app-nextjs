'use client';

import { getResource } from '@/helpers/fetch';
import { useQuery } from '@tanstack/react-query';
import ContainerCreateBudget from './ContainerCreateBudget';

export default function ContainerGetBudget() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['currentBudget'],
    queryFn: () =>
      getResource(`${process.env.NEXT_PUBLIC_URL}/api/budgets/current`),
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (data.budget) {
    return (
      <div>
        {data.budget.month}/{data.budget.year}
      </div>
    );
  }

  return <ContainerCreateBudget />;
}
