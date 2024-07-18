import { createExpense } from '@/server-actions/transaction';
import { ResponseCreateTransaction } from '@/types/client/transaction';
import { useFormState } from 'react-dom';
import Cookies from 'js-cookie';
import useBudgetStore from '@/stores/budget';
import { useEffect } from 'react';
import useExpenseCategoryStore from '@/stores/expense-category';
import { getResource } from '@/fetch';
import useModalStore from '@/stores/modal';
import NewExpenseCategoryModal from './NewExpenseCategoryModal';

const initialState: ResponseCreateTransaction = {
  budget: undefined,
};

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
  }));
  const [formState, formAction] = useFormState(createExpense, initialState);
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
    <form action={formAction}>
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
      <button type="submit" name="submit">
        Submit
      </button>
    </form>
  );
}
