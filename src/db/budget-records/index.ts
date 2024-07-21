import { User } from '@prisma/client';

import { BudgetRecordDb } from '@/types/budget-record';

import prisma from '..';

export async function createBudgetRecord(
  user: User
): Promise<BudgetRecordDb | null> {
  return await prisma.budgetRecord.create({
    data: { userId: user.id },
    include: { budgets: true },
  });
}

export async function findBudgetRecord(
  user: User
): Promise<BudgetRecordDb | null> {
  return prisma.budgetRecord.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      budgets: true,
    },
  });
}
