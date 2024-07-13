'use client';

import { getResource } from '@/fetch';
import { BudgetPeriod } from '@/types/client/budget-period';
import { useEffect, useState } from 'react';
import { useSignOut } from '@/hooks';
import BudgetPeriodPieChart from './BudgetPeriodPieChart';
import Cookie from 'js-cookie';

export default function ChartContainer() {
  const { signOut } = useSignOut();
  const [state, setState] = useState<BudgetPeriod>();

  async function fetchBudgetPeriods() {
    const authToken = Cookie.get('SATURN_APP_AUTH');
    const response = await getResource(
      `${process.env.NEXT_PUBLIC_API}/api/budget_periods/last?include:expenses`,
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
      setState(json.data.budgetPeriod);
    }
  }

  useEffect(() => {
    fetchBudgetPeriods();
  }, []);

  if (state) {
    return (
      <div>
        <BudgetPeriodPieChart budgetPeriod={state} />
      </div>
    );
  }

  return <p>No content</p>;
}
