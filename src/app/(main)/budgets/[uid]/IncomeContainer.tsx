'use client';

import useBudgetStore from "@/stores/budget"
import IncomeList from "./IncomeList";

export default function IncomeContainer(props: React.HTMLAttributes<HTMLDivElement>) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));

  if (budget && budget.income) {
    return (
      <div {...props}>
        <IncomeList income={budget.income} />
      </div>
    );
  }

  return <div {...props}>Loading...</div>
}
