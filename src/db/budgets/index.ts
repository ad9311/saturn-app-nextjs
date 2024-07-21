import prisma from '..';
import { BudgetDb, BudgetTemplate } from '@/types/budget';
import { BudgetRecordDb } from '@/types/budget-record';
import { Budget, Expense, Income, User } from '@prisma/client';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function createBudget(
  budgetRecord: BudgetRecordDb,
  budgetData: BudgetTemplate
): Promise<Budget | null> {
  const uid = `${budgetData.year}-${budgetData.month}-${budgetRecord.id}`;
  return await prisma.budget.create({
    data: {
      ...budgetData,
      uid,
      budgetRecord: { connect: { id: budgetRecord.id } },
    },
  });
}

export async function findCurrentBudget(user: User): Promise<BudgetDb | null> {
  const now = new Date();
  const firstDayOfMonth = startOfMonth(now);
  const lastDayOfMonth = endOfMonth(now);

  return await prisma.budget.findFirst({
    where: {
      budgetRecord: {
        userId: user.id,
      },
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
      expenses: true,
    },
  });
}

export async function findBudgetByUid(
  user: User,
  uid: string
): Promise<BudgetDb | null> {
  return await prisma.budget.findUnique({
    where: { uid, budgetRecord: { userId: user.id } },
    include: { incomeList: true, expenses: true },
  });
}

export async function findBudgetByMonthYear(
  budgetRecord: BudgetRecordDb,
  month: number,
  year: number
): Promise<Budget | null> {
  return await prisma.budget.findFirst({
    where: { budgetRercordId: budgetRecord.id, month, year },
  });
}

export async function aggregateBudgetOnCreateIncome(
  budget: BudgetDb,
  income: Income
): Promise<Budget> {
  return prisma.budget.update({
    where: {
      id: budget.id,
    },
    data: {
      balance: {
        increment: income.amount,
      },
      totalIncome: {
        increment: income.amount,
      },
      transactionCount: {
        increment: 1,
      },
      incomeCount: {
        increment: 1,
      },
    },
  });
}

export async function resolveBudgetOnUpdateIncome(
  budget: BudgetDb,
  income: Income
): Promise<Budget> {
  return prisma.budget.update({
    where: {
      id: budget.id,
    },
    data: {
      balance: {
        decrement: income.amount,
      },
      totalIncome: {
        decrement: income.amount,
      },
    },
  });
}

export async function aggregateBudgetOnUpdateIncome(
  budget: BudgetDb,
  income: Income
): Promise<Budget> {
  return prisma.budget.update({
    where: {
      id: budget.id,
    },
    data: {
      balance: {
        increment: income.amount,
      },
      totalIncome: {
        increment: income.amount,
      },
    },
  });
}

export async function resolveBudgetOnDeleteIncome(
  budget: BudgetDb,
  income: Income
): Promise<Budget> {
  return prisma.budget.update({
    where: {
      id: budget.id,
    },
    data: {
      balance: {
        decrement: income.amount,
      },
      totalIncome: {
        decrement: income.amount,
      },
      transactionCount: {
        decrement: 1,
      },
      incomeCount: {
        decrement: 1,
      },
    },
  });
}

export async function aggregateBudgetOnCreateExpense(
  budget: BudgetDb,
  expense: Expense
): Promise<Budget> {
  return prisma.budget.update({
    where: {
      id: budget.id,
    },
    data: {
      balance: {
        decrement: expense.amount,
      },
      totalExpenses: {
        increment: expense.amount,
      },
      transactionCount: {
        increment: 1,
      },
      expenseCount: {
        increment: 1,
      },
    },
  });
}
