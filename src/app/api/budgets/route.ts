import { createBudget } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';
import { getServerSession } from 'next-auth';

type BudgetBody = {
  month: number;
  year: number;
};

export async function GET() {
  return Response.json({ data: null });
}

export async function POST(request: Request) {
  const session = await getServerSession();

  if (session && session.user) {
    try {
      const body = (await request.json()) as BudgetBody;
      const user = await findUserByEmail(session.user.email as string);
      if (!user) {
        return Response.json({ error: 'forbidden' }, { status: 403 });
      }
      const budget = await createBudget(user.accountId, body);
      return Response.json({ data: { budget } }, { status: 201 });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }

  return Response.json({ error: 'unathorized' }, { status: 401 });
}
