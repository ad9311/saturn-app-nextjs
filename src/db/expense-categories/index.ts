import { ExpenseCategoryDb, ExpenseCategoryTemplate } from '@/types/expense-category';

import prisma from '..';

export async function createExpenseCategory(
  expenseCategoryData: ExpenseCategoryTemplate
): Promise<ExpenseCategoryDb> {
  return await prisma.expenseCategory.create({ data: expenseCategoryData });
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
