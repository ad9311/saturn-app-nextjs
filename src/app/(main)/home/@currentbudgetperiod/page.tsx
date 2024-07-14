import Link from 'next/link';
import ChartContainer from './ChartContainer';

export default function CurrentBudgetPeriod() {
  return (
    <article className="bg-neutral-200 h-full p-3 rounded-sm">
      <h2>Current budget period</h2>
      <Link href="/budget-periods/uid">See more</Link>
      <ChartContainer />
    </article>
  );
}
