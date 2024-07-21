import { useEffect } from 'react';
import ErrorList from '@/components/ErrorList';
import SubmitFormButton from '@/components/SubmitFormButton';
import { useExpenseCategoriesStore } from '@/stores/expense-categories';
import { useModalStore } from '@/stores/modal';
import { useFormState } from 'react-dom';
import TransactionModal from '../TransactionModal';
import { createExpenseCategoryAction } from '@/server-actions/expense-category';
import { ExpenseCategoryFormState } from '@/types/expense-category';
import NewExpenseForm from '../expenses/NewExpenseForm';

const initState: ExpenseCategoryFormState = {
  expenseCategory: null,
  errorMessages: null,
};

export default function NewExpenseCategoryForm() {
  const { addExpenseCategory } = useExpenseCategoriesStore(state => ({
    addExpenseCategory: state.addExpenseCategory,
  }));
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));
  const [formState, formAction] = useFormState(
    createExpenseCategoryAction,
    initState
  );

  useEffect(() => {
    if (formState.expenseCategory && !formState.errorMessages) {
      addExpenseCategory(formState.expenseCategory);
      setChildren(
        <TransactionModal title="New Expense">
          <NewExpenseForm />
        </TransactionModal>
      );
    }
  }, [formState]);

  return (
    <>
      <ErrorList errorMessages={formState.errorMessages} />
      <form action={formAction}>
        <label htmlFor="name">
          <input
            type="text"
            name="expense_category[name]"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="color">
          <input type="color" name="expense_category[color]" id="color" />
        </label>
        <SubmitFormButton />
      </form>
    </>
  );
}
