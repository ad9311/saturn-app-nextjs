import { createIncome } from '@/server-actions/transaction';
import { ResponseCreateTransaction } from '@/types/client/transaction';
import { useFormState } from 'react-dom';
import Cookie from 'js-cookie';
import useBudgetStore from '@/stores/budget';
import { useEffect } from 'react';

const initialState: ResponseCreateTransaction = {
  budget: undefined,
};

export default function NewIncomeForm() {
  const { budget, updateBudget } = useBudgetStore(state => ({
    budget: state.budget,
    updateBudget: state.updateBudget,
  }));
  const [formState, formAction] = useFormState(createIncome, initialState);
  const authToken = Cookie.get('SATURN_APP_AUTH');

  useEffect(() => {
    if (formState.budget) {
      updateBudget(formState.budget);
    }
  }, [formState]);

  return (
    <form action={formAction}>
      <input type="hidden" name="budget[uid]" value={budget?.uid} readOnly />
      <input type="hidden" name="auth_token" value={authToken} readOnly />
      <label htmlFor="description">
        <textarea
          name="income[description]"
          id="description"
          placeholder="Description"></textarea>
      </label>
      <label htmlFor="amount">
        <input
          type="number"
          name="income[amount]"
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
