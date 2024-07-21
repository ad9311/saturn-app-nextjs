'use server';

import { ExpenseCategoryFormState } from '@/types/expense-category';

export async function createExpenseCategoryAction(
  initState: ExpenseCategoryFormState,
  formData: FormData
): Promise<ExpenseCategoryFormState> {
  return initState;
}
