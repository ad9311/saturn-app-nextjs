import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import OpenArrow from '@/assets/img/open-arrow.svg';
import { auth } from '@/auth';
import { findCurrentBudget } from '@/db/budgets';

// import BudgetPieChart from './BudgetPieChart';
import BudgetInfo from './BudgetInfo';
import CreateNewBudgetForm from './CreateNewBudgetForm';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <article className="card">{children}</article>;
}

export default async function CurrentBudget() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return redirect('/auth/sign-in');
  }

  const budget = await findCurrentBudget(session.user.email);
  if (!budget) {
    return (
      <Wrapper>
        <h2 className="title">Current budget</h2>
        <p className="mt-4 subtitle text-sm">Create a new budget for this month</p>
        <div className="mt-5 flex justify-end">
          <CreateNewBudgetForm />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="flex items-center gap-3">
        <h2 className="title">Current budget</h2>
        <Link href={`/budgets/${budget.uid}`}>
          <Image src={OpenArrow} alt="go-to-current-budget" className="w-6" />
        </Link>
      </div>
      <BudgetInfo budget={budget} />
      {/* <BudgetPieChart budget={budget} /> */}
    </Wrapper>
  );
}
