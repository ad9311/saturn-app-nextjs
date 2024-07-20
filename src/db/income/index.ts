import prisma from '..';
import { IncomeDb, IncomeTemplate } from '@/types/transaction';
import { BudgetDb } from '@/types/budget';

export async function createIncome(
  budget: BudgetDb,
  incomeData: IncomeTemplate
): Promise<IncomeDb> {
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

export async function findIncomeById(
  incomeId: number
): Promise<IncomeDb | null> {
  return prisma.income.findUnique({
    where: {
      id: incomeId,
    },
  });
}

export async function updateIncome(
  income: IncomeDb,
  incomeData: IncomeTemplate
): Promise<IncomeDb> {
  return prisma.income.update({
    where: { id: income.id },
    data: { ...incomeData },
  });
}
