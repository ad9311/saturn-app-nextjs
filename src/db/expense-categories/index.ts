import prisma from '..';
import { User } from '@prisma/client';
import { ExpenseCategoryDb } from '@/types/expense-category';

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
