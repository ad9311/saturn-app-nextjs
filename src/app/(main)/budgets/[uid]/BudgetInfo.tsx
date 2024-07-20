'use client';

import { getResource } from "@/helpers/fetch";
import useBudgetStore from "@/stores/budget";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

async function getBudget(uid: string) {
  const { data } = await getResource(
    `${process.env.NEXT_PUBLIC_URL}/api/budgets/${uid}`
  );
  return data;
}

export default function BudgetInfo({ uid }: { uid: string }) {
  const { budget, setBudget } = useBudgetStore(state => ({
    budget: state.budget,
    setBudget: state.setBudget,
  }));
  const { isLoading, error, data } = useQuery({
    queryKey: ['budget'],
    queryFn: () => getBudget(uid),
  });

  useEffect(())

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (data.budget) {
    return <div>{data.budget.uid}</div>
  }

  return null;
}
