'use server';

import { createBudget, findBudgetByMonthYear } from '@/db/budgets';
import { CreateBudgetState } from '@/types/budget';
import { revalidatePath } from 'next/cache';
import { checkAuth } from '../helpers/auth';

export async function createBudgetAction(): Promise<CreateBudgetState> {
  const { user, error } = await checkAuth();

  if (!user) {
    return {
      budget: null,
      error,
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
