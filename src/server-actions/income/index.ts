'use server';

import { IncomeFormState, IncomeTemplate } from '@/types/transaction';
import { checkAuth } from '../helpers/auth';
import {
  aggregateBudgetOnCreateIncome,
  aggregateBudgetOnUpdateIncome,
  findBudgetByUid,
  resetAggBudgetOnDeleteIncome,
  resetAggBudgetOnUpdateIncome,
} from '@/db/budgets';
import {
  createIncome,
  deleteIncome,
  findIncomeById,
  updateIncome,
} from '@/db/income';
import { revalidatePath } from 'next/cache';
import { NewIncomeValidation } from '@/db/income/validations';
import { formatZodErrors } from '@/helpers/format';

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
      errorMessages: [error?.message as string],
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
    const budget = await findBudgetByUid(
      user,
      formData.get('budget[uid]') as string
    );

    if (!budget) {
      return {
        income: null,
        errorMessages: ['budget not found'],
      };
    }

    const income = await createIncome(budget, incomeData);
    await aggregateBudgetOnCreateIncome(budget, income);

    revalidatePath(`/budgets/${budget.uid}`);

    return {
      income,
      errorMessages: null,
    };
  } catch (error) {
    return { income: null, errorMessages: [error as string] };
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
      errorMessages: [error?.message as string],
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
    const budget = await findBudgetByUid(
      user,
      formData.get('budget[uid]') as string
    );

    if (!budget) {
      return {
        income: null,
        errorMessages: ['budget not found'],
      };
    }

    const oldIncome = await findIncomeById(Number(formData.get('income[id]')));

    if (!oldIncome) {
      return {
        income: null,
        errorMessages: ['income not found'],
      };
    }

    const newIncome = await updateIncome(oldIncome, incomeData);
    await resetAggBudgetOnUpdateIncome(budget, oldIncome);
    await aggregateBudgetOnUpdateIncome(budget, newIncome);

    revalidatePath(`/budgets/${budget.uid}`);

    return {
      income: newIncome,
      errorMessages: null,
    };
  } catch (error) {
    return { income: null, errorMessages: [error as string] };
  }
}

export async function deleteIncomeAction(
  initState: IncomeFormState,
  formData: FormData
): Promise<IncomeFormState> {
  const { user, error } = await checkAuth();

  if (!user) {
    return {
      income: null,
      errorMessages: [error?.message as string],
    };
  }

  try {
    const budget = await findBudgetByUid(
      user,
      formData.get('budget[uid]') as string
    );

    if (!budget) {
      return {
        income: null,
        errorMessages: ['budget not found'],
      };
    }

    const oldIncome = await findIncomeById(Number(formData.get('income[id]')));

    if (!oldIncome) {
      return {
        income: null,
        errorMessages: ['income not found'],
      };
    }

    await deleteIncome(oldIncome);
    await resetAggBudgetOnDeleteIncome(budget, oldIncome);

    revalidatePath(`/budgets/${budget.uid}`);

    return {
      income: oldIncome,
      errorMessages: null,
    };
  } catch (error) {
    return { income: null, errorMessages: [error as string] };
  }
}
