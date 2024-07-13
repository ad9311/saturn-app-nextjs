'use client';

import { getResource } from '@/fetch';
import { BudgetPeriod } from '@/types/client/budget-period';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import HistoryChart from './HistoryChart';
import { useSignOut } from '@/hooks';

export default function ChartContainer() {
  const { signOut } = useSignOut();
  const [state, setState] = useState<BudgetPeriod[]>([]);

  async function fetchBudgetPeriods() {
    const authToken = Cookie.get('SATURN_APP_AUTH');
    const response = await getResource(
      `${process.env.NEXT_PUBLIC_API}/api/budget_periods?limit=4&order=uid:desc`,
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
      setState(json.data.budgetPeriods);
    }
  }

  useEffect(() => {
    fetchBudgetPeriods();
  }, []);

  return (
    <div>
      <HistoryChart budgetPeriods={state} />
    </div>
  );
}
