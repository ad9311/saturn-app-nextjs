'use client';

import { getResource } from '@/fetch';
import { useEffect, useState } from 'react';
import { useSignOut } from '@/hooks';
import BudgetPeriodPieChart from './BudgetPeriodPieChart';
import Cookie from 'js-cookie';
import useBudgetPeriodStore from '@/stores/budget-period';

export default function ChartContainer() {
  const { signOut } = useSignOut();
  const { budgetPeriod, setBudgetPeriod } = useBudgetPeriodStore(state => ({
    budgetPeriod: state.budgetPeriod,
    setBudgetPeriod: state.setBudgetPeriod,
  }));

  async function fetchBudgetPeriods() {
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
      setBudgetPeriod(json.data.budgetPeriod);
    }
  }

  useEffect(() => {
    if (budgetPeriod === undefined) {
      fetchBudgetPeriods();
    }
  }, []);

  if (budgetPeriod) {
    return (
      <div>
        <BudgetPeriodPieChart budgetPeriod={budgetPeriod} />
      </div>
    );
  }

  return <p>Loading...</p>;
}
