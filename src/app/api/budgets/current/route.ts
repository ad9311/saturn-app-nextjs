import { auth } from '@/auth';
import { findCurrentBudget } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';
import { NextResponse } from 'next/server';

export const GET = auth(async function GET(request) {
  if (!request.auth) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  if (!request.auth.user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const user = await findUserByEmail(request.auth.user.email as string);

    if (!user) {
      return Response.json({ error: 'database error' }, { status: 500 });
    }

    const budget = await findCurrentBudget(user.accountId);
    return Response.json({ budget });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
});
