import prisma from '..';
import { BudgetDb, BudgetTemplate } from '@/types/budget';
import { Budget, User } from '@prisma/client';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function createBudget(
  user: User,
  budgetData: BudgetTemplate
): Promise<Budget | null> {
  const uid = `${budgetData.year}-${budgetData.month}-${user.accountId}`;
  return await prisma.budget.create({
    data: {
      ...budgetData,
      uid,
      user: { connect: { accountId: user.accountId } },
    },
  });
}

export async function findCurrentBudget(
  user: User
): Promise<BudgetDb | null> {
  const now = new Date();
  const firstDayOfMonth = startOfMonth(now);
  const lastDayOfMonth = endOfMonth(now);

  return await prisma.budget.findFirst({
    where: {
      userAccountId: user.accountId,
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
  user: User,
  uid: string
): Promise<BudgetDb | null> {
  return await prisma.budget.findUnique({
    where: { uid, userAccountId: user.accountId },
    include: { incomeList: true },
  });
}

export async function findBudgetByMonthYear(
  user: User,
  month: number,
  year: number
): Promise<BudgetDb | null> {
  return await prisma.budget.findFirst({
    where: { userAccountId: user.accountId, month, year },
    include: { incomeList: true },
  });
}
