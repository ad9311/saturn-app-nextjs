'use client';

import useBudgetStore from "@/stores/budget"
import ExpensesList from "./ExpensesList";

export default function ExpensesContainer(props: React.HTMLAttributes<HTMLDivElement>) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));

  if (budget && budget.expenses) {
    if (budget.expenses.length === 0) {
      return <div {...props}>No expenses yet</div>
    }

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
