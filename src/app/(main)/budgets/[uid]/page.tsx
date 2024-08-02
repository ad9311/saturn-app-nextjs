import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { findBudgetByUid } from '@/db/budgets';
import { findExpenseCategories } from '@/db/expense-categories';

import BudgetInfo from './BudgetInfo';
import ExpenseChart from './expenses/ExpenseChart';
import ExpenseList from './expenses/ExpenseList';
import IncomeList from './income/IncomeList';
import SavePageDataToStore from './SavePageDataToStore';

export default async function BudgetPages({ params }: { params: { uid: string } }) {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return redirect('/auth/sign-in');
  }

  const budget = await findBudgetByUid(session.user.email, params.uid);
  if (!budget) {
    return <p>NOT FOUND</p>;
  }

  const expenseCategories = await findExpenseCategories(session.user.email);

  return (
    <>
      <SavePageDataToStore budget={budget} expenseCategories={expenseCategories} />
      <div className="grid grid-flow-row gap-3">
        <div className="grid grid-flow-row gap-3 lg:grid-cols-12 lg:grid-flow-col">
          <BudgetInfo budget={budget} className="card lg:col-span-5" />
          <IncomeList budget={budget} className="card lg:col-span-7" />
        </div>
        <div className="grid grid-flow-row gap-3 lg:grid-cols-12 lg:grid-flow-col">
          <ExpenseList budget={budget} className="card lg:col-span-8" />
          <ExpenseChart className="card lg:col-span-4" />
        </div>
      </div>
    </>
  );
}
