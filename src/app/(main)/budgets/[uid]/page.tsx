import { auth } from '@/auth';
import { findBudgetByUid } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';

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

  return <div>{budget.balance.toFixed(2)}</div>;
}
