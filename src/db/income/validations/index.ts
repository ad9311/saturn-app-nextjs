import { z } from 'zod';

export const NewIncomeValidation = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
});
