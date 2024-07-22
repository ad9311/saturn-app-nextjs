'use server';

import { revalidatePath } from 'next/cache';

import { findBudgetRecord } from '@/db/budget-records';
import { createBudget, findBudgetByMonthYear } from '@/db/budgets';
import { CreateBudgetState } from '@/types/budget';

import { checkAuth } from '../helpers/auth';

export async function createBudgetAction(): Promise<CreateBudgetState> {
  const { user, error } = await checkAuth();
  if (!user) {
    return {
      budget: null,
      errorMessages: [error?.message ?? 'user not authenticated'],
    };
  }

  try {
    const budgetRecord = await findBudgetRecord(user);
    if (!budgetRecord) {
      throw new Error('budget record not found');
    }

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const budgetData = { month, year };

    const existingBudget = await findBudgetByMonthYear(budgetRecord, month, year);

    if (existingBudget) {
      throw new Error('duplicated budget');
    }

    const budget = await createBudget(budgetRecord, budgetData);

    revalidatePath('/');

    return { budget, errorMessages: null };
  } catch (error) {
    return { budget: null, errorMessages: [(error as Error).message] };
  }
}
