import SubmitFormButton from '@/components/SubmitFormButton';
import { createIncomeAction } from '@/server-actions/income';
import { CreateIncomeState } from '@/types/transaction';
import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const initState: CreateIncomeState = {
  income: null,
  error: null,
};

export default function NewIncomeForm({ budgetUid }: { budgetUid: string }) {
  const [formState, formAction] = useFormState(createIncomeAction, initState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.income) {
      ref.current?.reset();
    }
  }, [formState]);

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
