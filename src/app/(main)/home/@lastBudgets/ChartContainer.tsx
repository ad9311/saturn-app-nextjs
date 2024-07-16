'use client';

import { getResource } from '@/fetch';
import Budget from '@/types/client/budget';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import HistoryChart from './HistoryChart';
import { useSignOut } from '@/hooks';
import useBudgetStore from '@/stores/budget';

export default function ChartContainer() {
  const { signOut } = useSignOut();
  const { budgets, setBudgets } = useBudgetStore(state => ({
    budgets: state.budgets,
    setBudgets: state.setBudgets,
  }));

  async function fetchBudgets() {
    const authToken = Cookie.get('SATURN_APP_AUTH');
    const response = await getResource(
      `${process.env.NEXT_PUBLIC_API}/api/budgets?order=uid:desc&limit=4`,
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
      setBudgets(json.data.budgets);
    }
  }

  useEffect(() => {
    if (budgets.length === 0) {
      fetchBudgets();
    }
  }, []);

  if (budgets.length) {
    return (
      <div>
        <HistoryChart budgets={budgets} />
      </div>
    );
  }

  return <p>Loading...</p>;
}
