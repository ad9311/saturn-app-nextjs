'use server';

import { postResource } from "@/helpers/fetch";
import { CreateBudgetState } from "@/types/budget";

export async function createBudget(prevState: CreateBudgetState, formData: FormData): Promise<CreateBudgetState> {
  const body = JSON.stringify({
    month: formData.get('budget[month]'),
    year: formData.get('budget[year]'),
  })

  const { data, response } = await postResource(`${process.env.NEXT_PUBLIC_URL}/api/budgets`, body);

  if (response.ok) {
    return {
      budget: data.budget,
      error: null,
    }
  }

  return {
    budget: prevState.budget,
    error: data.error
  }
}
