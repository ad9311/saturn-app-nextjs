import { auth } from '@/auth';
import { findCurrentBudget } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';
import CreateNewBudgetForm from './CreateNewBudgetForm';
import BudgetPieChart from './BudgetPieChart';
import Link from 'next/link';

export default async function Container() {
  const session = await auth();
  if (!session) return null;
  if (!session.user) return null;

  const user = await findUserByEmail(session.user.email as string);
  if (!user) return null;

  const budget = await findCurrentBudget(user);
  if (!budget) return <CreateNewBudgetForm />;

  return (
    <>
      <Link href={`/budgets/${budget.uid}`}>Go to budget</Link>
      <BudgetPieChart budget={budget} />
    </>
  );
}
