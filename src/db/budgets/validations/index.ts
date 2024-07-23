import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const NewBudgetValidation = z.object({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(currentYear).max(currentYear),
});
