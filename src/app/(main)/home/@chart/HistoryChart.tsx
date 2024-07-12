import { BudgetPeriod } from '@/types/client/budget-period';

export default function HistoryChart({
  budgetPeriods,
}: {
  budgetPeriods: BudgetPeriod[];
}) {
  const mappedBudgetPeriods = budgetPeriods.map(bp => (
    <li key={bp.uid}>
      {bp.month}/{bp.year}
    </li>
  ));

  return <ul>{mappedBudgetPeriods}</ul>;
}
