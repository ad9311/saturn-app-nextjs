import { IncomeTemplate } from '@/types/transaction';
import prisma from '..';

export async function createIncome(
  budgetId: number,
  incomeData: IncomeTemplate
) {
  return await prisma.income.create({
    data: {
      ...incomeData,
      budget: {
        connect: {
          id: budgetId,
        },
      },
    },
  });
}
