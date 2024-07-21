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
