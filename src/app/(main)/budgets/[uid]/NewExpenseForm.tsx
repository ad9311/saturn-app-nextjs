import { createExpense } from '@/server-actions/transaction';
import { ResponseCreateTransaction } from '@/types/client/transaction';
import { useFormState, useFormStatus } from 'react-dom';
import Cookies from 'js-cookie';
import useBudgetStore from '@/stores/budget';
import { useEffect, useRef } from 'react';
import useExpenseCategoryStore from '@/stores/expense-category';
import { getResource } from '@/fetch';
import useModalStore from '@/stores/modal';
import NewExpenseCategoryModal from './NewExpenseCategoryModal';

const initialState: ResponseCreateTransaction = {
  budget: undefined,
};

function SubmitFormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export default function NewExpenseForm() {
  const { budget, setBudget } = useBudgetStore(state => ({
    budget: state.budget,
    setBudget: state.setBudget,
  }));
  const { expenseCategories, setExpenseCategories } = useExpenseCategoryStore(
    state => ({
      expenseCategories: state.expenseCategories,
      setExpenseCategories: state.setExpenseCategories,
    })
  );
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
    clearChildren: state.clearChildren,
  }));
  const [formState, formAction] = useFormState(createExpense, initialState);
  const ref = useRef<HTMLFormElement>(null);
  const authToken = Cookies.get('SATURN_APP_AUTH');

  async function getExpenseCategories() {
    const response = await getResource(
      `${process.env.NEXT_PUBLIC_API}/api/expense_categories`,
      authToken as string
    );
    const json = await response.json();

    if (json.status === 'SUCCESS') {
      setExpenseCategories(json.data.expenseCategories);
    }
  }

  function handleNewCategory() {
    setChildren(<NewExpenseCategoryModal returnToNewExpense />);
  }

  useEffect(() => {
    if (formState.budget) {
      setBudget(formState.budget);
      ref.current?.reset();
    }
  }, [formState]);

  useEffect(() => {
    if (expenseCategories.length === 0) {
      getExpenseCategories();
    }
  }, []);

  const mappedExpenseCategories = expenseCategories.map(expenseCategory => (
    <option key={expenseCategory.id} value={expenseCategory.id}>
      {expenseCategory.name}
    </option>
  ));

  return (
    <form action={formAction} ref={ref}>
      <input type="hidden" name="budget[uid]" value={budget?.uid} readOnly />
      <input type="hidden" name="auth_token" value={authToken} readOnly />
      <label htmlFor="description">
        <textarea
          name="expense[description]"
          id="description"
          placeholder="Description"></textarea>
      </label>
      <label htmlFor="expense_categories">
        <button type="button" onClick={handleNewCategory}>
          New category
        </button>
        <select name="expense[expense_category_id]" id="expense_categories">
          {mappedExpenseCategories.length === 0
            ? 'Loading...'
            : mappedExpenseCategories}
        </select>
      </label>
      <label htmlFor="amount">
        <input
          type="number"
          name="expense[amount]"
          id="amount"
          placeholder="Amount"
        />
      </label>
      <SubmitFormButton />
    </form>
  );
}
