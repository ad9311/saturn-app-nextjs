import { z } from 'zod';

export const NewExpenseCategoryValidation = z.object({
  name: z.string().min(1).max(20),
  color: z
    .string()
    .length(7)
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  budgetRecordId: z.number().int().positive(),
});
