import prisma from '..';
import { BudgetDB } from '@/types/budget';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function createBudget(accountId: number, budget: BudgetDB) {
  const uid = `${budget.year}-${budget.month}-${accountId}`;
  return await prisma.budget.create({
    data: {
      ...budget,
      uid,
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

export async function findBudgetByUid(uid: string) {
  return await prisma.budget.findUnique({ where: { uid } });
}
