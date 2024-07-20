import { Income } from '@prisma/client';
import { FormErrors } from '..';

export type IncomeDb = Income;

export type IncomeTemplate = {
  amount: number;
  description: string;
};

export type IncomeFormState = FormErrors & {
  income: Income | null;
};
