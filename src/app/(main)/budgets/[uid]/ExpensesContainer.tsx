'use client';

import useBudgetStore from "@/stores/budget"
import ExpensesList from "./ExpensesList";

export default function ExpensesContainer(props: React.HTMLAttributes<HTMLDivElement>) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));

  if (budget && budget.expenses) {
    return (
      <div {...props}>
        <ExpensesList expenses={budget.expenses} />
      </div>
    );
  }

  return (
    <div {...props}>Loading...</div>
  )
}
