'use server';

import { ExpenseFormState, ExpenseTemplate } from '@/types/transaction';
import { checkAuth } from '../helpers/auth';
import { formatZodErrors } from '@/helpers/format';
import { NewExpenseValidation } from '@/db/expenses/validations';
import { revalidatePath } from 'next/cache';
import {
  aggregateBudgetOnCreateExpense,
  aggregateBudgetOnUpdateExpense,
  findBudgetByUid,
  resolveBudgetOnDeleteExpense,
  resolveBudgetOnUpdateExpense,
} from '@/db/budgets';
import {
  createExpense,
  deleteExpense,
  findExpenseById,
  updateExpense,
} from '@/db/expenses';

function getExpenseFormData(formData: FormData): ExpenseTemplate {
  return {
    description: formData.get('expense[description]') as string,
    amount: Number(formData.get('expense[amount]')),
    expenseCategoryId: Number(formData.get('expense_category[id]')),
  };
}

export async function createExpenseAction(
  _initState: ExpenseFormState,
  formData: FormData
): Promise<ExpenseFormState> {
  const { user, error } = await checkAuth();

  if (!user) {
    return {
      expense: null,
      errorMessages: [error?.message as string],
    };
  }

  const expenseData = getExpenseFormData(formData);
  const result = NewExpenseValidation.safeParse(expenseData);

  if (!result.success) {
    return {
      expense: null,
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
        expense: null,
        errorMessages: ['budget not found'],
      };
    }

    const expense = await createExpense(budget, expenseData);
    await aggregateBudgetOnCreateExpense(budget, expense);

    revalidatePath(`/budgets/${budget.uid}`);

    return {
      expense,
      errorMessages: null,
    };
  } catch (error) {
    return { expense: null, errorMessages: [(error as Error).message] };
  }
}

export async function updateExpenseAction(
  _initState: ExpenseFormState,
  formData: FormData
): Promise<ExpenseFormState> {
  const { user, error } = await checkAuth();

  if (!user) {
    return {
      expense: null,
      errorMessages: [error?.message as string],
    };
  }

  const expenseData = getExpenseFormData(formData);
  const result = NewExpenseValidation.safeParse(expenseData);

  if (!result.success) {
    return {
      expense: null,
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
        expense: null,
        errorMessages: ['budget not found'],
      };
    }

    const oldExpense = await findExpenseById(
      Number(formData.get('expense[id]'))
    );
    if (!oldExpense) {
      return {
        expense: null,
        errorMessages: ['expense not found'],
      };
    }

    const newExpense = await updateExpense(oldExpense, expenseData);
    await resolveBudgetOnUpdateExpense(budget, oldExpense);
    await aggregateBudgetOnUpdateExpense(budget, newExpense);

    revalidatePath(`/budgets/${budget.uid}`);

    return {
      expense: newExpense,
      errorMessages: null,
    };
  } catch (error) {
    return { expense: null, errorMessages: [(error as Error).message] };
  }
}

export async function deleteExpenseAction(
  _initState: ExpenseFormState,
  formData: FormData
): Promise<ExpenseFormState> {
  const { user, error } = await checkAuth();

  if (!user) {
    return {
      expense: null,
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
        expense: null,
        errorMessages: ['budget not found'],
      };
    }

    const expense = await findExpenseById(Number(formData.get('expense[id]')));

    if (!expense) {
      return {
        expense: null,
        errorMessages: ['expense not found'],
      };
    }

    await deleteExpense(expense);
    await resolveBudgetOnDeleteExpense(budget, expense);

    revalidatePath(`/budgets/${budget.uid}`);

    return {
      expense,
      errorMessages: null,
    };
  } catch (error) {
    return { expense: null, errorMessages: [(error as Error).message] };
  }
}
