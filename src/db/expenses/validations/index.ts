import { z } from 'zod';

export const NewExpenseValidation = z.object({
  description: z.string().min(1).max(30),
  expenseCategoryId: z.number().int().positive(),
  amount: z
    .number()
    .positive()
    .refine(
      num => {
        const split = num.toString().split('.')[1];
        if (!split) {
          return true;
        }
        return split.length <= 2;
      },
      {
        message: 'Max precision is 2 decimal places',
      }
    ),
});
