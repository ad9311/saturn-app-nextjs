import Link from 'next/link';
import ChartContainer from './ChartContainer';

export default function LastBudgets() {
  return (
    <article className="bg-neutral-200 h-full p-3 rounded-sm">
      <h2>Last Budget</h2>
      <Link href="/budgets">See more</Link>
      <ChartContainer />
    </article>
  );
}
