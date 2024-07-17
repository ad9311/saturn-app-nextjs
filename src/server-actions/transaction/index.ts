'use server';

import { postResource } from '@/fetch';
import { ResponseCreateIncome } from '@/types/client/transaction';

export async function createIncome(
  prevState: ResponseCreateIncome,
  formData: FormData
): Promise<ResponseCreateIncome> {
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
      income: json.data.income,
    };
  }

  return prevState;
}
