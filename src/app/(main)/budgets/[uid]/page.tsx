import { auth } from '@/auth';
import { findBudgetByUid } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';
import InfoContainer from './InfoContainer';
import IncomeContainer from './IncomeContainer';
import ExpensesContainer from './ExpensesContainer';
import ChartContainer from './ChartContainer';

export default async function BudgetPages({
  params,
}: {
  params: { uid: string };
}) {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }

  const user = await findUserByEmail(session.user.email as string);
  if (!user) return null;

  const budget = await findBudgetByUid(user.accountId, params.uid);
  if (!budget) return <p>NOT FOUND</p>;

  return (
    <div className="grid grid-flow-row gap-3">
      <div className="grid grid-flow-row gap-3 lg:grid-cols-12 lg:grid-flow-col">
        <InfoContainer
          budget={budget}
          className="p-3 bg-neutral-200 rounded-sm lg:col-span-5"
        />
        <IncomeContainer className="p-3 bg-neutral-200 rounded-sm lg:col-span-7" />
      </div>
      <div className="grid grid-flow-row gap-3 lg:grid-cols-12 lg:grid-flow-col">
        <ExpensesContainer className="p-3 bg-neutral-200 rounded-sm lg:col-span-8" />
        <ChartContainer className="p-3 bg-neutral-200 rounded-sm lg:col-span-4" />
      </div>
    </div>
  );
}
