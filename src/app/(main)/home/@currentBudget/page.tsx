import Link from 'next/link';

import { findCurrentBudget } from '@/db/budgets';
import { checkAuth } from '@/server-actions/helpers/auth';

import BudgetPieChart from './BudgetPieChart';
import CreateNewBudgetForm from './CreateNewBudgetForm';

export default async function CurrentBudget() {
  const { user } = await checkAuth();
  if (!user) {
    return null;
  }

  const budget = await findCurrentBudget(user);
  if (!budget) {
    return <CreateNewBudgetForm />;
  }

  return (
    <article className="bg-neutral-200 h-full p-3 rounded">
      <h2>Current budget</h2>
      <Link href={`/budgets/${budget.uid}`}>Go to budget</Link>
      <BudgetPieChart budget={budget} />
    </article>
  );
}
