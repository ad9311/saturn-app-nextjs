'use server';

import { revalidatePath } from 'next/cache';

import {
  aggregateBudgetOnCreateIncome,
  aggregateBudgetOnUpdateIncome,
  findBudgetByUid,
  resolveBudgetOnDeleteIncome,
  resolveBudgetOnUpdateIncome,
} from '@/db/budgets';
import { createIncome, deleteIncome, findIncomeById, updateIncome } from '@/db/income';
import { NewIncomeValidation } from '@/db/income/validations';
import { formatZodErrors } from '@/helpers/format';
import { IncomeFormState, IncomeTemplate } from '@/types/transaction';

import { checkAuth } from '../helpers/auth';

function getIncomeFormData(formData: FormData): IncomeTemplate {
  return {
    description: formData.get('income[description]') as string,
    amount: Number(formData.get('income[amount]')),
  };
}

export async function createIncomeAction(
  _initState: IncomeFormState,
  formData: FormData
): Promise<IncomeFormState> {
  const { user, error } = await checkAuth();
  if (!user) {
    return {
      income: null,
      errorMessages: [error?.message ?? 'user not authenticated'],
    };
  }

  const incomeData = getIncomeFormData(formData);
  const result = NewIncomeValidation.safeParse(incomeData);
  if (!result.success) {
    return {
      income: null,
      errorMessages: formatZodErrors(result.error.issues),
    };
  }

  try {
    const budget = await findBudgetByUid(user, formData.get('budget[uid]') as string);

    if (!budget) {
      throw new Error('budget not found');
    }

    const income = await createIncome(budget, incomeData);
    await aggregateBudgetOnCreateIncome(budget, income);

    revalidatePath(`/budgets/${budget.uid}`);

    return { income, errorMessages: null };
  } catch (error) {
    return { income: null, errorMessages: [(error as Error).message] };
  }
}

export async function updateIncomeAction(
  _initState: IncomeFormState,
  formData: FormData
): Promise<IncomeFormState> {
  const { user, error } = await checkAuth();
  if (!user) {
    return {
      income: null,
      errorMessages: [error?.message ?? 'user not authenticated'],
    };
  }

  const incomeData = getIncomeFormData(formData);
  const result = NewIncomeValidation.safeParse(incomeData);
  if (!result.success) {
    return {
      income: null,
      errorMessages: formatZodErrors(result.error.issues),
    };
  }

  try {
    const budget = await findBudgetByUid(user, formData.get('budget[uid]') as string);

    if (!budget) {
      throw new Error('budget not found');
    }

    const income = await findIncomeById(Number(formData.get('income[id]')));
    if (!income) {
      throw new Error('income not found');
    }

    const newIncome = await updateIncome(income, incomeData);
    await resolveBudgetOnUpdateIncome(budget, income);
    await aggregateBudgetOnUpdateIncome(budget, newIncome);

    revalidatePath(`/budgets/${budget.uid}`);

    return { income: newIncome, errorMessages: null };
  } catch (error) {
    return { income: null, errorMessages: [(error as Error).message] };
  }
}

export async function deleteIncomeAction(
  _initState: IncomeFormState,
  formData: FormData
): Promise<IncomeFormState> {
  const { user, error } = await checkAuth();
  if (!user) {
    return {
      income: null,
      errorMessages: [error?.message ?? 'user not authenticated'],
    };
  }

  try {
    const budget = await findBudgetByUid(user, formData.get('budget[uid]') as string);
    if (!budget) {
      throw new Error('budget not found');
    }

    const income = await findIncomeById(Number(formData.get('income[id]')));
    if (!income) {
      throw new Error('income not found');
    }

    await deleteIncome(income);
    await resolveBudgetOnDeleteIncome(budget, income);

    revalidatePath(`/budgets/${budget.uid}`);

    return { income, errorMessages: null };
  } catch (error) {
    return { income: null, errorMessages: [(error as Error).message] };
  }
}
