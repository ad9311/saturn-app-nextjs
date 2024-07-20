import prisma from '..';
import { BudgetDb, BudgetTemplate } from '@/types/budget';
import { Budget } from '@prisma/client';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function createBudget(
  accountId: number,
  budget: BudgetTemplate
): Promise<Budget | null> {
  const uid = `${budget.year}-${budget.month}-${accountId}`;
  return await prisma.budget.create({
    data: {
      ...budget,
      uid,
      user: { connect: { accountId } },
    },
  });
}

export async function findCurrentBudget(
  userAccountId: number
): Promise<BudgetDb | null> {
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
    include: {
      incomeList: true,
    },
  });
}

export async function findBudgetByUid(
  userAccountId: number,
  uid: string
): Promise<BudgetDb | null> {
  return await prisma.budget.findUnique({
    where: { uid, userAccountId },
    include: { incomeList: true },
  });
}

export async function findBudgetByMonthYear(
  userAccountId: number,
  month: number,
  year: number
): Promise<BudgetDb | null> {
  return await prisma.budget.findUnique({
    where: { userAccountId, month, year },
    include: { incomeList: true },
  });
}
