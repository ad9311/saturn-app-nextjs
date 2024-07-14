'use client';

import { getResource } from '@/fetch';
import { useEffect, useState } from 'react';
import { useSignOut } from '@/hooks';
import BudgetPieChart from './BudgetPieChart';
import Cookie from 'js-cookie';
import useBudgetStore from '@/stores/budget';

export default function ChartContainer() {
  const { signOut } = useSignOut();
  const { budget, setBudget } = useBudgetStore(state => ({
    budget: state.budget,
    setBudget: state.setBudget,
  }));

  async function fetchBudgets() {
    const authToken = Cookie.get('SATURN_APP_AUTH');
    const response = await getResource(
      `${process.env.NEXT_PUBLIC_API}/api/budget_periods/1202405?include=expenses`,
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
      setBudget(json.data.budgetPeriod);
    }
  }

  useEffect(() => {
    if (budget === undefined) {
      fetchBudgets();
    }
  }, []);

  if (budget) {
    return (
      <div>
        <BudgetPieChart budget={budget} />
      </div>
    );
  }

  return <p>Loading...</p>;
}
