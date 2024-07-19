import prisma from '..';
import { BudgetDB } from '@/types/budget';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function createBudget(accountId: number, budget: BudgetDB) {
  return await prisma.budget.create({
    data: {
      ...budget,
      user: { connect: { accountId } },
    },
  });
}

export async function findCurrentBudget(userAccountId: number) {
  const now = new Date();
  const firstDayOfMonth = startOfMonth(now);
  const lastDayOfMonth = endOfMonth(now);

  return await prisma.budget.findFirst({
    where: {
      userAccountId,
      createdAt: {
        gte: firstDayOfMonth,
        lte: lastDayOfMonth,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}
