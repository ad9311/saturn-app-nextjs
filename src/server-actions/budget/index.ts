'use server';

import { auth } from '@/auth';
import { createBudget } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';
import { CreateBudgetState } from '@/types/budget';
import { revalidatePath } from 'next/cache';

export async function createBudgetAction(): Promise<CreateBudgetState> {
  const session = await auth();
  if (!session || !session.user) return {
    budget: null,
    error: 'Session error, user not authenticated.'
  };

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const budgetDb = { month, year };

  const user = await findUserByEmail(session.user.email as string);

  if (!user) return {
    budget: null,
    error: 'DB error, user not found.'
  };

  const budget = await createBudget(user.accountId, budgetDb);
  revalidatePath('/');

  return {
    budget,
    error: null,
  };
}
