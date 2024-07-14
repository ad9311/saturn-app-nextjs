import Link from 'next/link';
import ChartContainer from './ChartContainer';

export default function LastBudgetPeriods() {
  return (
    <article className="bg-neutral-200 h-full p-3 rounded-sm">
      <h2>Last Budget Periods</h2>
      <Link href="/budget-periods">See more</Link>
      <ChartContainer />
    </article>
  );
}
