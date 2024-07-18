import { createIncome } from '@/server-actions/transaction';
import { ResponseCreateTransaction } from '@/types/client/transaction';
import { useFormState, useFormStatus } from 'react-dom';
import Cookie from 'js-cookie';
import useBudgetStore from '@/stores/budget';
import { useEffect, useRef } from 'react';

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

export default function NewIncomeForm() {
  const { budget, setBudget } = useBudgetStore(state => ({
    budget: state.budget,
    setBudget: state.setBudget,
  }));
  const [formState, formAction] = useFormState(createIncome, initialState);
  const ref = useRef<HTMLFormElement>(null);
  const authToken = Cookie.get('SATURN_APP_AUTH');

  useEffect(() => {
    if (formState.budget) {
      setBudget(formState.budget);
      ref.current?.reset();
    }
  }, [formState]);

  return (
    <form action={formAction} ref={ref}>
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
      <SubmitFormButton />
    </form>
  );
}
