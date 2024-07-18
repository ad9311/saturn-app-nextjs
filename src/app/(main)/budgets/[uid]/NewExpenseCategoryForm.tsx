import { createExpenseCategory } from '@/server-actions/expense-category';
import { ResponseCreateExpenseCategory } from '@/types/client/expense-category';
import { useFormState, useFormStatus } from 'react-dom';
import Cookies from 'js-cookie';
import useExpenseCategoryStore from '@/stores/expense-category';
import { useEffect, useRef } from 'react';
import useModalStore from '@/stores/modal';
import NewExpenseModal from './NewExpenseModal';

const initialState: ResponseCreateExpenseCategory = {
  expenseCategories: [],
};

function SubmitFormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export default function NewExpenseCategoryForm() {
  const { setExpenseCategories } = useExpenseCategoryStore(state => ({
    setExpenseCategories: state.setExpenseCategories,
  }));
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));
  const [formState, formAction] = useFormState(
    createExpenseCategory,
    initialState
  );
  const authToken = Cookies.get('SATURN_APP_AUTH');

  useEffect(() => {
    if (formState.expenseCategories.length > 0) {
      setExpenseCategories(formState.expenseCategories);
      setChildren(<NewExpenseModal />);
    }
  }, [formState]);

  return (
    <form action={formAction}>
      <input type="hidden" name="auth_token" value={authToken} readOnly />
      <label htmlFor="name">
        <input
          type="text"
          name="expense_category[name]"
          id="name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="color">
        <input
          type="color"
          name="expense_category[color]"
          id="color"
          placeholder="Name"
        />
      </label>
      <SubmitFormButton />
    </form>
  );
}
