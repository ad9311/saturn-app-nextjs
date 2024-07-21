import { findCurrentBudget } from '@/db/budgets';
import CreateNewBudgetForm from './CreateNewBudgetForm';
import BudgetPieChart from './BudgetPieChart';
import { checkAuth } from '@/server-actions/helpers/auth';
import { findBudgetRecord } from '@/db/budget-records';
import Link from 'next/link';

export default async function Container() {
  const { user } = await checkAuth();
  if (!user) return null;

  const budgetRecord = await findBudgetRecord(user);
  if (!budgetRecord) return <p>Not budget record yet!</p>;

  const budget = await findCurrentBudget(budgetRecord);
  if (!budget) return <CreateNewBudgetForm />;

  return (
    <>
      <Link href={`/budgets/${budget.uid}`}>Go to budget</Link>
      <BudgetPieChart budget={budget} />
    </>
  );
}
