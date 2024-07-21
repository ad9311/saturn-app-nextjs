'use server';

import { createBudget, findBudgetByMonthYear } from '@/db/budgets';
import { CreateBudgetState } from '@/types/budget';
import { revalidatePath } from 'next/cache';
import { checkAuth } from '../helpers/auth';
import { findBudgetRecord } from '@/db/budget-records';

export async function createBudgetAction(): Promise<CreateBudgetState> {
  const { user, error } = await checkAuth();

  if (!user) {
    return {
      budget: null,
      errorMessages: [error?.message as string],
    };
  }

  try {
    const budgetRecord = await findBudgetRecord(user);
    if (!budgetRecord) {
      return {
        budget: null,
        errorMessages: ['budget record not found'],
      };
    }

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const budgetData = { month, year };

    const existingBudget = await findBudgetByMonthYear(
      budgetRecord,
      month,
      year
    );

    if (existingBudget) {
      return {
        budget: null,
        errorMessages: ['duplicated budget'],
      };
    }

    const budget = await createBudget(budgetRecord, budgetData);

    revalidatePath('/');

    return {
      budget,
      errorMessages: null,
    };
  } catch (error) {
    return { budget: null, errorMessages: [error as string] };
  }
}
