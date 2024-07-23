import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import ErrorList from '@/components/client/ErrorList';
import SubmitFormButton from '@/components/client/SubmitFormButton';
import { deleteExpenseCategoryAction } from '@/server-actions/expense-category';
import { useExpenseCategoriesStore } from '@/stores/expense-categories';
import { ExpenseCategoryDb, ExpenseCategoryFormState } from '@/types/expense-category';

const initState: ExpenseCategoryFormState = {
  expenseCategory: null,
  errors: null,
};

export default function DeleteExpenseCategoryForm({
  expenseCategory,
}: {
  expenseCategory: ExpenseCategoryDb;
}) {
  const { deleteExpenseCategory } = useExpenseCategoriesStore(state => ({
    deleteExpenseCategory: state.deleteExpenseCategory,
  }));
  const [formState, formAction] = useFormState(deleteExpenseCategoryAction, initState);

  useEffect(() => {
    if (formState.expenseCategory && !formState.errors) {
      deleteExpenseCategory(formState.expenseCategory);
    }
  }, [formState]);

  if (formState.expenseCategory && !formState.errors) {
    return <p>Expense category deleted successfully</p>;
  }

  return (
    <>
      <ErrorList errors={formState.errors} />
      <form action={formAction}>
        <input type="hidden" name="expense_category[id]" value={expenseCategory.id} readOnly />
        <SubmitFormButton />
      </form>
    </>
  );
}
