'use server';

import { postResource } from '@/fetch';
import { ResponseCreateTransaction } from '@/types/client/transaction';

export async function createIncome(
  prevState: ResponseCreateTransaction,
  formData: FormData
): Promise<ResponseCreateTransaction> {
  const body = JSON.stringify({
    income: {
      amount: formData.get('income[amount]'),
      description: formData.get('income[description]'),
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
      budget: json.data.budget,
    };
  }

  return prevState;
}

export async function createExpense(
  prevState: ResponseCreateTransaction,
  formData: FormData
): Promise<ResponseCreateTransaction> {
  const body = JSON.stringify({
    expense: {
      amount: formData.get('expense[amount]'),
      description: formData.get('expense[description]'),
      expense_category_id: formData.get('expense[expense_category_id]'),
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
      budget: json.data.budget,
    };
  }

  return prevState;
}
