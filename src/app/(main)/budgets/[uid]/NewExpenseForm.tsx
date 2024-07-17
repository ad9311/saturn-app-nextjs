import { createExpense } from '@/server-actions/transaction';
import { ResponseCreateExpense } from '@/types/client/transaction';
import { useFormState } from 'react-dom';
import Cookie from 'js-cookie';
import useBudgetStore from '@/stores/budget';
import { useEffect } from 'react';

const initialState: ResponseCreateExpense = {
  expense: undefined,
};

export default function NewExpenseForm() {
  const { budget, addExpense } = useBudgetStore(state => ({
    budget: state.budget,
    addExpense: state.addExpense,
  }));
  const [formState, formAction] = useFormState(createExpense, initialState);
  const authToken = Cookie.get('SATURN_APP_AUTH');

  useEffect(() => {
    if (formState.expense) {
      addExpense(formState.expense);
    }
  }, [formState]);

  if (!budget) return null;

  return (
    <form action={formAction}>
      <input type="hidden" name="budget[uid]" value={budget.uid} readOnly />
      <input type="hidden" name="auth_token" value={authToken} readOnly />
      <label htmlFor="description">
        <textarea
          name="expense[description]"
          id="description"
          placeholder="Description"></textarea>
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
