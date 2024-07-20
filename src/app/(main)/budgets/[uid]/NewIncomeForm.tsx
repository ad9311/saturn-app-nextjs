import { createIncomeAction } from '@/server-actions/income';
import { CreateIncomeState } from '@/types/transaction';
import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const initState: CreateIncomeState = {
  income: null,
  error: null,
};

function SubmitFormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export default function NewIncomeForm({ budgetUid }: { budgetUid: string }) {
  const [formState, formAction] = useFormState(createIncomeAction, initState);
  const ref = useRef<HTMLFormElement>(null);

  if (formState.error) return <p>{formState.error.message}</p>;

  return (
    <form action={formAction} ref={ref}>
      <input type="hidden" name="budget[uid]" value={budgetUid} readOnly />
      <label htmlFor="description">
        <textarea
          name="income[description]"
          id="description"
          placeholder="Description"
        />
      </label>
      <label htmlFor="amount">
        <input
          type="number"
          name="income[amount]"
          id="amount"
          placeholder="Amount"
          min={1}
          step={0.01}
        />
      </label>
      <SubmitFormButton />
    </form>
  );
}
