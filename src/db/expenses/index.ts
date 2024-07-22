'use server';

import { BudgetDb } from '@/types/budget';
import { ExpenseDb, ExpenseTemplate } from '@/types/transaction';

import prisma from '..';

export async function createExpense(
  budget: BudgetDb,
  expenseData: ExpenseTemplate
): Promise<ExpenseDb> {
  const { expenseCategoryId, ...data } = expenseData;
  return await prisma.expense.create({
    data: {
      ...data,
      budget: {
        connect: {
          id: budget.id,
        },
      },
      expenseCategory: {
        connect: {
          id: expenseCategoryId,
        },
      },
    },
    include: { expenseCategory: true },
  });
}

export async function findExpenseById(id: number): Promise<ExpenseDb | null> {
  return prisma.expense.findUnique({
    where: {
      id,
    },
    include: { expenseCategory: true },
  });
}

export async function updateExpense(
  expense: ExpenseDb,
  expenseData: ExpenseTemplate
): Promise<ExpenseDb> {
  return await prisma.expense.update({
    where: {
      id: expense.id,
    },
    data: {
      ...expenseData,
    },
    include: { expenseCategory: true },
  });
}

export async function deleteExpense(expense: ExpenseDb): Promise<ExpenseDb> {
  return await prisma.expense.delete({
    where: {
      id: expense.id,
    },
    include: { expenseCategory: true },
  });
}
