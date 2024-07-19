import { findCurrentBudget } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();

  if (session && session.user) {
    try {
      const user = await findUserByEmail(session.user.email as string);

      if (!user) {
        return Response.json({ error: 'forbidden' }, { status: 403 });
      }

      const budget = await findCurrentBudget(user.accountId);
      return Response.json({ data: budget });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }

  return Response.json({ data: 'unauthorized' }, { status: 401 });
}
