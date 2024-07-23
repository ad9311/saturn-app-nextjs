'use server';

import { revalidatePath } from 'next/cache';

import {
  aggregateBudgetOnCreateExpense,
  aggregateBudgetOnUpdateExpense,
  findBudgetByUid,
  resolveBudgetOnDeleteExpense,
  resolveBudgetOnUpdateExpense,
} from '@/db/budgets';
import { createExpense, deleteExpense, findExpenseById, updateExpense } from '@/db/expenses';
import { NewExpenseValidation } from '@/db/expenses/validations';
import { formatZodErrors } from '@/helpers/format';
import { ExpenseFormState, ExpenseTemplate } from '@/types/transaction';

import { checkAuth } from '../helpers/auth';

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
      errors: [{ message: error?.message ?? 'user not authenticated' }],
    };
  }

  const expenseData = getExpenseFormData(formData);
  const result = NewExpenseValidation.safeParse(expenseData);

  if (!result.success) {
    return {
      expense: null,
      errors: formatZodErrors(result.error.issues),
    };
  }

  try {
    const budget = await findBudgetByUid(user.email, formData.get('budget[uid]') as string);
    if (!budget) {
      throw new Error('budget not found');
    }

    const expense = await createExpense(budget, expenseData);
    await aggregateBudgetOnCreateExpense(budget, expense);

    revalidatePath(`/budgets/${budget.uid}`);

    return { expense, errors: null };
  } catch (error) {
    return { expense: null, errors: [{ message: (error as Error).message }] };
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
      errors: [{ message: error?.message ?? 'user not authenticated' }],
    };
  }

  const expenseData = getExpenseFormData(formData);
  const result = NewExpenseValidation.safeParse(expenseData);
  if (!result.success) {
    return {
      expense: null,
      errors: formatZodErrors(result.error.issues),
    };
  }

  try {
    const budget = await findBudgetByUid(user.email, formData.get('budget[uid]') as string);
    if (!budget) {
      throw new Error('budget not found');
    }

    const oldExpense = await findExpenseById(Number(formData.get('expense[id]')));
    if (!oldExpense) {
      throw new Error('expense not found');
    }

    const newExpense = await updateExpense(oldExpense, expenseData);
    await resolveBudgetOnUpdateExpense(budget, oldExpense);
    await aggregateBudgetOnUpdateExpense(budget, newExpense);

    revalidatePath(`/budgets/${budget.uid}`);

    return { expense: newExpense, errors: null };
  } catch (error) {
    return { expense: null, errors: [{ message: (error as Error).message }] };
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
      errors: [{ message: error?.message ?? 'user not authenticated' }],
    };
  }

  try {
    const budget = await findBudgetByUid(user.email, formData.get('budget[uid]') as string);
    if (!budget) {
      throw new Error('budget not found');
    }

    const expense = await findExpenseById(Number(formData.get('expense[id]')));
    if (!expense) {
      throw new Error('expense not found');
    }

    await deleteExpense(expense);
    await resolveBudgetOnDeleteExpense(budget, expense);

    revalidatePath(`/budgets/${budget.uid}`);

    return { expense, errors: null };
  } catch (error) {
    return { expense: null, errors: [{ message: (error as Error).message }] };
  }
}
