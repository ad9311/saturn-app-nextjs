'use server';

import { postResource } from '@/fetch';
import { ResponseCreateExpenseCategory } from '@/types/client/expense-category';

export async function createExpenseCategory(
  prevState: ResponseCreateExpenseCategory,
  formData: FormData
): Promise<ResponseCreateExpenseCategory> {
  const body = JSON.stringify({
    expense_category: {
      name: formData.get('expense_category[name]'),
      color: formData.get('expense_category[color]'),
    },
  });

  const authToken = formData.get('auth_token');

  const response = await postResource(
    `${process.env.API}/api/expense_categories/`,
    authToken as string,
    body
  );

  const json = await response.json();

  if (json.status === 'SUCCESS') {
    return {
      expenseCategories: json.data.expenseCategories,
    };
  }

  return prevState;
}
