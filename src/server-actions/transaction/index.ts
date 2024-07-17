'use server';

import { postResource } from '@/fetch';
import { ResponseCreateExpense, ResponseCreateIncome } from '@/types/client/transaction';

export async function createIncome(
  prevState: ResponseCreateIncome,
  formData: FormData
): Promise<ResponseCreateIncome> {
  const body = JSON.stringify({
    income: {
      amount: formData.get('expense[amount]'),
      description: formData.get('expense[description]'),
    },
  });

  const authToken = formData.get('auth_token');

  const response = await postResource(
    `${process.env.API}/api/budgets/${formData.get('budget[uid]')}/incomes`,
    authToken as string,
    body
  );

  const json = await response.json();

  if (json.status === 'SUCCESS') {
    console.log(json);
    return {
      income: json.data.income,
    };
  }

  return prevState;
}

export async function createExpense(
  prevState: ResponseCreateExpense,
  formData: FormData
): Promise<ResponseCreateExpense> {
  const body = JSON.stringify({
    expense: {
      amount: formData.get('expense[amount]'),
      description: formData.get('expense[description]'),
      expense_category_id: formData.get('expense[expense_category_id]')
    },
  });

  const authToken = formData.get('auth_token');

  const response = await postResource(
    `${process.env.API}/api/budgets/${formData.get('budget[uid]')}/expenses`,
    authToken as string,
    body
  );

  const json = await response.json();

  if (json.status === 'SUCCESS') {
    console.log(json);
    return {
      expense: json.data.expense,
    };
  }

  return prevState;
}
