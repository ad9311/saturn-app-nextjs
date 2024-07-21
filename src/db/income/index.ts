'use server';

import { BudgetDb } from '@/types/budget';
import { IncomeDb, IncomeTemplate } from '@/types/transaction';

import prisma from '..';

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

export async function findIncomeById(id: number): Promise<IncomeDb | null> {
  return prisma.income.findUnique({
    where: {
      id,
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

export async function deleteIncome(income: IncomeDb): Promise<IncomeDb> {
  return prisma.income.delete({
    where: {
      id: income.id,
    },
  });
}
