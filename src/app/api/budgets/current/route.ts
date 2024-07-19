import { auth } from '@/auth';
import { findCurrentBudget } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';

export async function GET() {
  const session = await auth();

  if (session && session.user) {
    try {
      const user = await findUserByEmail(session.user.email as string);

      if (!user) {
        return Response.json({ error: 'forbidden' }, { status: 403 });
      }

      const budget = await findCurrentBudget(user.accountId);
      return Response.json({ budget });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }

  return Response.json({ error: 'unauthorized' }, { status: 401 });
}
