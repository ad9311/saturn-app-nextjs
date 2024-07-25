import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { findCurrentBudget } from '@/db/budgets';

// import BudgetPieChart from './BudgetPieChart';
import CreateNewBudgetForm from './CreateNewBudgetForm';
import Image from 'next/image';
import OpenArrow from '@/assets/img/open-arrow.svg';
import BudgetInfo from './BudgetInfo';

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
    <article className="card h-full p-3 rounded">
      <div className="flex items-center gap-3">
        <h2 className="title">Current budget</h2>
        <Link href={`/budgets/${budget.uid}`}>
          <Image src={OpenArrow} alt="go-to-current-budget" className="w-6" />
        </Link>
      </div>
      <BudgetInfo budget={budget} />
      {/* <BudgetPieChart budget={budget} /> */}
    </article>
  );
}
