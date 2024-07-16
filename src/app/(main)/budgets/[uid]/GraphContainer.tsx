'use client';

import useBudgetStore from '@/stores/budget';
import ExpensesPieChart from './ExpensesPieChart';

export default function GraphContainer(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));

  if (budget && budget.expenses) {
    if (budget.expenses.length === 0) {
      return <div {...props}>No data</div>;
    }

    return (
      <div {...props}>
        <ExpensesPieChart expenses={budget.expenses} />
      </div>
    );
  }

  return <div {...props}>Loading...</div>;
}
