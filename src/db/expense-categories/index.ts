import { BudgetRecord } from '@prisma/client';

import { ExpenseCategoryDb, ExpenseCategoryTemplate } from '@/types/expense-category';

import prisma from '..';

export async function createExpenseCategory(
  budgetRecord: BudgetRecord,
  expenseCategoryData: ExpenseCategoryTemplate
): Promise<ExpenseCategoryDb> {
  return await prisma.expenseCategory.create({
    data: { ...expenseCategoryData, budgetRecord: { connect: { id: budgetRecord.id } } },
  });
}

export async function findExpenseCategories(userEmail: string): Promise<ExpenseCategoryDb[]> {
  return await prisma.expenseCategory.findMany({
    where: {
      budgetRecord: {
        user: {
          email: userEmail,
        },
      },
    },
  });
}

export async function findExpenseCategoryById(id: number): Promise<ExpenseCategoryDb | null> {
  return await prisma.expenseCategory.findUnique({
    where: { id },
  });
}

export async function updateExpenseCategory(
  expenseCategory: ExpenseCategoryDb,
  expenseCategoryData: ExpenseCategoryTemplate
): Promise<ExpenseCategoryDb> {
  return await prisma.expenseCategory.update({
    where: {
      id: expenseCategory.id,
    },
    data: expenseCategoryData,
  });
}

export async function deleteExpenseCategory(
  expenseCategory: ExpenseCategoryDb
): Promise<ExpenseCategoryDb> {
  return await prisma.expenseCategory.delete({
    where: { id: expenseCategory.id },
  });
}
