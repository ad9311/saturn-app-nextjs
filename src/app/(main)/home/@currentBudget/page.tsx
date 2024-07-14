import Link from 'next/link';
import ChartContainer from './ChartContainer';

export default function CurrentBudge() {
  return (
    <article className="bg-neutral-200 h-full p-3 rounded-sm">
      <h2>Current budget</h2>
      <Link href="/budgets/uid">See more</Link>
      <ChartContainer />
    </article>
  );
}
