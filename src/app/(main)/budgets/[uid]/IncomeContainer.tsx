'use client';

import useBudgetStore from '@/stores/budget';
import IncomeList from './IncomeList';

export default function IncomeContainer(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));

  if (budget && budget.incomeList) {
    if (budget.incomeList.length === 0) {
      return <div {...props}>No income yet</div>;
    }

    return (
      <div {...props}>
        <IncomeList incomeList={budget.incomeList} />
      </div>
    );
  }

  return <div {...props}>Loading...</div>;
}
