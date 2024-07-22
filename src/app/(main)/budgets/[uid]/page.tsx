import { redirect } from 'next/navigation';

import { findBudgetByUid } from '@/db/budgets';
import { findExpenseCategories } from '@/db/expense-categories';
import { checkAuth } from '@/server-actions/helpers/auth';

import BudgetInfo from './BudgetInfo';
import ExpenseChart from './expenses/ExpenseChart';
import ExpenseList from './expenses/ExpenseList';
import IncomeList from './income/IncomeList';
import SavePageDataToStore from './SavePageDataToStore';

export default async function BudgetPages({
  params,
}: {
  params: { uid: string };
}) {
  const { user } = await checkAuth();
  if (!user) {
    return redirect('/auth/sign-in');
  }

  const budget = await findBudgetByUid(user, params.uid);
  if (!budget) {
    return <p>NOT FOUND</p>;
  }

  const expenseCategories = await findExpenseCategories(user);

  return (
    <>
      <SavePageDataToStore
        budget={budget}
        expenseCategories={expenseCategories}
      />
      <div className="grid grid-flow-row gap-3">
        <div className="grid grid-flow-row gap-3 lg:grid-cols-12 lg:grid-flow-col">
          <BudgetInfo
            budget={budget}
            className="p-3 bg-neutral-200 rounded-sm lg:col-span-5"
          />
          <IncomeList
            budget={budget}
            className="p-3 bg-neutral-200 rounded-sm lg:col-span-7"
          />
        </div>
        <div className="grid grid-flow-row gap-3 lg:grid-cols-12 lg:grid-flow-col">
          <ExpenseList
            budget={budget}
            className="p-3 bg-neutral-200 rounded-sm lg:col-span-8"
          />
          <ExpenseChart className="p-3 bg-neutral-200 rounded-sm lg:col-span-4" />
        </div>
      </div>
    </>
  );
}
