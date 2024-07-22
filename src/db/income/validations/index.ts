import { z } from 'zod';

export const NewIncomeValidation = z.object({
  description: z.string().min(1),
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
