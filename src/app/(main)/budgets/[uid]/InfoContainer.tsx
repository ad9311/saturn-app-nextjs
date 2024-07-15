'use client';

import { getResource } from "@/fetch";
import { useSignOut } from "@/hooks";
import useBudgetStore from "@/stores/budget"
import Cookie from 'js-cookie'
import { notFound } from "next/navigation";
import { useEffect } from "react";
import BudgetInfo from "./BudgetInfo";

export default function InfoContainer({ uid }: { uid: string }) {
  const { signOut } = useSignOut();
  const { budget, setBudget } = useBudgetStore(state => ({
    budget: state.budget,
    setBudget: state.setBudget,
  }));

  async function fetchBudget() {
    const authToken = Cookie.get('SATURN_APP_AUTH');
    const response = await getResource(
      `${process.env.NEXT_PUBLIC_API}/api/budget_periods/${uid}?include=expenses`,
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
    if (budget === undefined || budget.uid !== Number(uid)) {
      fetchBudget();
    }
  }, []);

  if (budget) {
    return (
      <div>
        <BudgetInfo budget={budget} />
      </div>
    );
  }

  return <p>Loading...</p>
}
