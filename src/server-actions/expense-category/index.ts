'use server';

import {
  ExpenseCategoryFormState,
  ExpenseCategoryTemplate,
} from '@/types/expense-category';
import { checkAuth } from '../helpers/auth';
import { createExpenseCategory } from '@/db/expense-categories';
import { findBudgetRecord } from '@/db/budget-records';

export async function createExpenseCategoryAction(
  _initState: ExpenseCategoryFormState,
  formData: FormData
): Promise<ExpenseCategoryFormState> {
  const { user, error } = await checkAuth();

  if (!user) {
    return {
      expenseCategory: null,
      errorMessages: [error?.message as string],
    };
  }

  try {
    const budgetRecord = await findBudgetRecord(user);
    if (!budgetRecord) {
      return {
        expenseCategory: null,
        errorMessages: ['budget record not found'],
      };
    }

    // TODO ZOD VALIDATION
    const expenseCategoryData: ExpenseCategoryTemplate = {
      name: formData.get('expense_category[name]') as string,
      color: formData.get('expense_category[color]') as string,
      budgetRecordId: budgetRecord.id,
    };

    const expenseCategory = await createExpenseCategory(expenseCategoryData);

    return {
      expenseCategory,
      errorMessages: null,
    };
  } catch (error) {
    return { expenseCategory: null, errorMessages: [error as string] };
  }
}
