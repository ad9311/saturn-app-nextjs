import { findBudgetByUid } from '@/db/budgets';
import InfoContainer from './InfoContainer';
import IncomeContainer from './income/IncomeContainer';
import ExpensesContainer from './expenses/ExpensesContainer';
import ChartContainer from './expenses/ChartContainer';
import { checkAuth } from '@/server-actions/helpers/auth';

export default async function BudgetPages({
  params,
}: {
  params: { uid: string };
}) {
  const { user, error } = await checkAuth();
  if (!user) return <p>{error?.message}</p>

  const budget = await findBudgetByUid(user, params.uid);
  if (!budget) return <p>NOT FOUND</p>;

  return (
    <div className="grid grid-flow-row gap-3">
      <div className="grid grid-flow-row gap-3 lg:grid-cols-12 lg:grid-flow-col">
        <InfoContainer
          budget={budget}
          className="p-3 bg-neutral-200 rounded-sm lg:col-span-5"
        />
        <IncomeContainer
          budget={budget}
          className="p-3 bg-neutral-200 rounded-sm lg:col-span-7"
        />
      </div>
      <div className="grid grid-flow-row gap-3 lg:grid-cols-12 lg:grid-flow-col">
        <ExpensesContainer className="p-3 bg-neutral-200 rounded-sm lg:col-span-8" />
        <ChartContainer className="p-3 bg-neutral-200 rounded-sm lg:col-span-4" />
      </div>
    </div>
  );
}
