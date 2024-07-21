import prisma from '..';
import { User } from '@prisma/client';
import {
  ExpenseCategoryDb,
  ExpenseCategoryTemplate,
} from '@/types/expense-category';

export async function createExpenseCategory(
  expenseCategoryData: ExpenseCategoryTemplate
): Promise<ExpenseCategoryDb> {
  return await prisma.expenseCategory.create({ data: expenseCategoryData });
}

export async function findExpenseCategories(
  user: User
): Promise<ExpenseCategoryDb[]> {
  return await prisma.expenseCategory.findMany({
    where: {
      budgetRecord: {
        userId: user.id,
      },
    },
  });
}
