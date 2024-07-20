'use server';

import { CreateIncomeState, IncomeTemplate } from '@/types/transaction';
import { checkAuth } from '../helpers/auth';
import { aggregateBudgetOnCreateIncome, findBudgetByUid } from '@/db/budgets';
import { createIncome } from '@/db/income';
import { revalidatePath } from 'next/cache';
import { NewIncomeValidation } from '@/db/income/validations';

export async function createIncomeAction(
  _initState: CreateIncomeState,
  formData: FormData
): Promise<CreateIncomeState> {
  const { user, error } = await checkAuth();

  if (!user) {
    return {
      income: null,
      error,
    };
  }

  try {
    const incomeData: IncomeTemplate = {
      description: formData.get('income[description]') as string,
      amount: Number(formData.get('income[amount]')),
    };
    const result = NewIncomeValidation.safeParse(incomeData);

    if (!result.success) {
      return {
        income: null,
        error: {
          message: 'form has invalid values',
        }
      }
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

    const income = await createIncome(budget, incomeData);
    await aggregateBudgetOnCreateIncome(budget, income);

    revalidatePath(`/budgets/${budget.uid}`);

    return {
      income,
      error: null,
    };
  } catch (error) {
    return { income: null, error: { message: error as string } };
  }
}
