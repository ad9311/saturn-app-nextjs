'use server';

import { auth } from '@/auth';
import { createBudget, findBudgetByMonthYear } from '@/db/budgets';
import { findUserByEmail } from '@/db/users';
import { CreateBudgetState } from '@/types/budget';
import { revalidatePath } from 'next/cache';

export async function createBudgetAction(): Promise<CreateBudgetState> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      budget: null,
      error: {
        message: 'user not authenticated',
      },
    };
  }

  const user = await findUserByEmail(session.user.email as string);

  if (!user) {
    return {
      budget: null,
      error: {
        message: 'user not found',
      },
    };
  }

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const existingBudget = await findBudgetByMonthYear(
    user.accountId,
    month,
    year
  );

  if (existingBudget) {
    return {
      budget: null,
      error: {
        message: 'duplicated budget',
      },
    };
  }

  const budgetDb = { month, year };

  const budget = await createBudget(user.accountId, budgetDb);
  revalidatePath('/');

  return {
    budget,
    error: null,
  };
}
