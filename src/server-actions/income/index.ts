'use server';

import { CreateIncomeState, IncomeTemplate } from '@/types/transaction';
import { checkAuth } from '../helpers/auth';
import { findBudgetByUid } from '@/db/budgets';
import { createIncome } from '@/db/income';
import { revalidatePath } from 'next/cache';

export async function createIncomeAction(
  initState: CreateIncomeState,
  formData: FormData
): Promise<CreateIncomeState> {
  const { user, error } = await checkAuth();

  if (!user) {
    return {
      income: null,
      error,
    };
  }

  const budget = await findBudgetByUid(
    user,
    formData.get('budget[uid]') as string
  );

  if (!budget) {
    return {
      income: null,
      error: {
        message: 'budget not found',
      },
    };
  }

  const incomeData: IncomeTemplate = {
    description: formData.get('income[description]') as string,
    amount: Number(formData.get('income[amount]')),
  };
  const income = await createIncome(budget, incomeData);
  revalidatePath(`/budgets/${budget.uid}`);

  return {
    income,
    error: null,
  };
}
