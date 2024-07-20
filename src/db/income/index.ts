import prisma from '..';
import { IncomeTemplate } from '@/types/transaction';
import { BudgetDb } from '@/types/budget';

export async function createIncome(
  budget: BudgetDb,
  incomeData: IncomeTemplate
) {
  return await prisma.income.create({
    data: {
      ...incomeData,
      budget: {
        connect: {
          id: budget.id,
        },
      },
    },
  });
}
