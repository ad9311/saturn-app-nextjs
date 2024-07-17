import { createIncome } from '@/server-actions/transaction';
import { ResponseCreateIncome } from '@/types/client/transaction';
import { useFormState } from 'react-dom';
import Cookie from 'js-cookie';
import useBudgetStore from '@/stores/budget';
import { useEffect } from 'react';

const initialState: ResponseCreateIncome = {
  income: undefined,
};

export default function NewIncomeForm() {
  const { budget, addIncome } = useBudgetStore(state => ({
    budget: state.budget,
    addIncome: state.addIncome,
  }));
  const [formState, formAction] = useFormState(createIncome, initialState);
  const authToken = Cookie.get('SATURN_APP_AUTH');

  useEffect(() => {
    if (formState.income) {
      addIncome(formState.income);
    }
  }, [formState]);

  if (!budget) return null;

  return (
    <form action={formAction}>
      <input type="hidden" name="budget[uid]" value={budget.uid} readOnly />
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
