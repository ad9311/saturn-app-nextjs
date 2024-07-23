import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { findCurrentBudget } from '@/db/budgets';

import BudgetPieChart from './BudgetPieChart';
import CreateNewBudgetForm from './CreateNewBudgetForm';

export default async function CurrentBudget() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return redirect('/auth/sign-in');
  }

  const budget = await findCurrentBudget(session.user.email);
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
