'use server';

import { auth } from '@/auth';
import { createBudget } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';
import { CreateBudgetState } from '@/types/budget';

export async function createBudgetAction(
  prevState: CreateBudgetState,
  formData: FormData
): Promise<CreateBudgetState> {
  const session = await auth();
  if (!session || !session.user) return prevState;

  const body = {
    month: Number(formData.get('budget[month]')),
    year: Number(formData.get('budget[year]')),
  };

  const user = await findUserByEmail(session.user.email as string);

  if (!user) return prevState;

  const budget = await createBudget(user.accountId, body);

  return {
    budget,
    error: null,
  };
}
