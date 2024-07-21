'use server';

import { findBudgetRecord } from '@/db/budget-records';
import { createExpenseCategory } from '@/db/expense-categories';
import { NewExpenseCategoryValidation } from '@/db/expense-categories/validations';
import { formatZodErrors } from '@/helpers/format';
import {
  ExpenseCategoryFormState,
  ExpenseCategoryTemplate,
} from '@/types/expense-category';

import { checkAuth } from '../helpers/auth';

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

    const expenseCategoryData: ExpenseCategoryTemplate = {
      name: formData.get('expense_category[name]') as string,
      color: formData.get('expense_category[color]') as string,
      budgetRecordId: budgetRecord.id,
    };
    const result = NewExpenseCategoryValidation.safeParse(expenseCategoryData);
    if (!result.success) {
      return {
        expenseCategory: null,
        errorMessages: formatZodErrors(result.error.issues),
      };
    }

    const expenseCategory = await createExpenseCategory(expenseCategoryData);

    return {
      expenseCategory,
      errorMessages: null,
    };
  } catch (error) {
    return { expenseCategory: null, errorMessages: [(error as Error).message] };
  }
}
