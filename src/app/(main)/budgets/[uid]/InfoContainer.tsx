'use client';

import { getResource } from '@/fetch';
import { useSignOut } from '@/hooks';
import useBudgetStore from '@/stores/budget';
import Cookie from 'js-cookie';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';
import BudgetInfo from './BudgetInfo';

type InfoContainerProps = { uid: string } & React.HTMLAttributes<HTMLDivElement>;

export default function InfoContainer(props: InfoContainerProps) {
  const { signOut } = useSignOut();
  const { budget, setBudget } = useBudgetStore(state => ({
    budget: state.budget,
    setBudget: state.setBudget,
  }));

  async function fetchBudget() {
    const authToken = Cookie.get('SATURN_APP_AUTH');
    const response = await getResource(
      `${process.env.NEXT_PUBLIC_API}/api/budget_periods/${props.uid}?include=expenses:income`,
      authToken as string
    );

    if (!response.ok) {
      // TODO
      if (response.status === 401) {
        return signOut();
      }

      if (response.status === 404) {
        notFound();
      }
    }

    const json = await response.json();

    if (json.status === 'SUCCESS') {
      setBudget(json.data.budgetPeriod);
    }
  }

  useEffect(() => {
    if (budget === undefined || budget.uid !== Number(props.uid)) {
      fetchBudget();
    }
  }, []);

  if (budget) {
    return (
      <div {...props}>
        <BudgetInfo budget={budget} />
      </div>
    );
  }

  return <p>Loading...</p>;
}
