'use client';

import { getResource } from '@/fetch';
import { useEffect } from 'react';
import { useSignOut } from '@/hooks';
import BudgetPieChart from './BudgetPieChart';
import Cookie from 'js-cookie';
import useBudgetStore from '@/stores/budget';
import Link from 'next/link';
import { compareMonthYear } from '@/helpers/date';

export default function ChartContainer() {
  const { signOut } = useSignOut();
  const { budget, setBudget } = useBudgetStore(state => ({
    budget: state.budget,
    setBudget: state.setBudget,
  }));

  async function fetchBudget() {
    const authToken = Cookie.get('SATURN_APP_AUTH');
    const response = await getResource(
      `${process.env.NEXT_PUBLIC_API}/api/budgets/last?include=expenses:income_list`,
      authToken as string
    );

    if (!response.ok) {
      // TODO
      if (response.status === 401) {
        return signOut();
      }
    }

    const json = await response.json();

    if (json.status === 'SUCCESS') {
      setBudget(json.data.budget);
    }
  }

  useEffect(() => {
    if (budget === undefined) {
      fetchBudget();
      return;
    }

    const isCurrentBudget = compareMonthYear(budget.month, budget.year);
    if (!isCurrentBudget) {
      fetchBudget();
      return;
    }
  }, []);

  if (budget) {
    return (
      <div>
        <Link href={`/budgets/${budget.uid}`}>See more</Link>
        <BudgetPieChart budget={budget} />
      </div>
    );
  }

  return <p>Loading...</p>;
}
