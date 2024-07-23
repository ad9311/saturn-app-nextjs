'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import ErrorList from '@/components/client/ErrorList';
import SubmitFormButton from '@/components/client/SubmitFormButton';
import { updateExpenseCategoryAction } from '@/server-actions/expense-category';
import { useExpenseCategoriesStore } from '@/stores/expense-categories';
import { ExpenseCategoryDb, ExpenseCategoryFormState } from '@/types/expense-category';

const initState: ExpenseCategoryFormState = {
  expenseCategory: null,
  errors: null,
};

export default function UpdateExpenseCategoryForm({
  expenseCategory,
}: {
  expenseCategory: ExpenseCategoryDb;
}) {
  const { updateExpenseCategory } = useExpenseCategoriesStore(state => ({
    updateExpenseCategory: state.updateExpenseCategory,
  }));
  const [formState, formAction] = useFormState(updateExpenseCategoryAction, initState);

  useEffect(() => {
    if (formState.expenseCategory && !formState.errors) {
      updateExpenseCategory(formState.expenseCategory);
    }
  }, [formState]);

  if (formState.expenseCategory && !formState.errors) {
    return <p>Expense category updated successfully</p>;
  }

  return (
    <>
      <ErrorList errors={formState.errors} />
      <form action={formAction}>
        <input type="hidden" name="expense_category[id]" value={expenseCategory.id} readOnly />
        <label htmlFor="name">
          <input
            type="text"
            name="expense_category[name]"
            id="name"
            placeholder="Name"
            defaultValue={expenseCategory.name}
          />
        </label>
        <label htmlFor="color">
          <input
            type="color"
            name="expense_category[color]"
            id="color"
            defaultValue={expenseCategory.color}
          />
        </label>
        <SubmitFormButton />
      </form>
    </>
  );
}
