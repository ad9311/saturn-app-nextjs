import { auth } from '@/auth';
import { createBudget } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';
import { NextResponse } from 'next/server';

type BudgetBody = {
  month: number;
  year: number;
};

export const GET = auth(async function GET(request) {
  if (request.auth) {
    return NextResponse.json({ session: request.auth });
  }

  return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})

export const POST = auth(async function POST(request) {
  // console.log(request);

  if (!request.auth) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  if (!request.auth.user) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403})
  }

  try {
    const body = (await request.json()) as BudgetBody;
    const user = await findUserByEmail(request.auth.user.email as string);

    if (!user) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }

    const budget = await createBudget(user.accountId, body);
    return NextResponse.json({ budget }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
});
