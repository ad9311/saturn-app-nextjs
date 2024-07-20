'use server';

import { CreateIncomeState } from '@/types/transaction';

export async function createIncome(
  initState: CreateIncomeState,
  formData: FormData
): Promise<CreateIncomeState> {
  return initState;
}
