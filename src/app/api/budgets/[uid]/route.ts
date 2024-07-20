import { auth } from '@/auth';
import { findBudgetByUid } from '@/db/budgets';
import { NextResponse } from 'next/server';

export const GET = auth(async function GET(request, { params }) {
  if (!request.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const uid = params?.uid as string;
  const budget = await findBudgetByUid(uid);

  return NextResponse.json({ budget });
});
