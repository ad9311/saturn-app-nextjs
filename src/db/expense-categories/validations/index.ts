'use server';

import { z } from 'zod';

export const NewExpenseCategoryValidation = z.object({
  name: z.string().min(1),
  color: z.string().length(7),
  budgetRecordId: z.number().int(),
});
