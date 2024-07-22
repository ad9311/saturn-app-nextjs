'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import ErrorList from '@/components/ErrorList';
import SubmitFormButton from '@/components/SubmitFormButton';
import { createIncomeAction } from '@/server-actions/income';
import { useBudgetStore } from '@/stores/budget';
import { IncomeFormState } from '@/types/transaction';

const initState: IncomeFormState = {
  income: null,
  errorMessages: null,
};

export default function NewIncomeForm() {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const [formState, formAction] = useFormState(createIncomeAction, initState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.income && !formState.errorMessages) {
      ref.current?.reset();
    }
  }, [formState]);

  return (
    <>
      <ErrorList errorMessages={formState.errorMessages} />
      <form action={formAction} ref={ref}>
        <input type="hidden" name="budget[uid]" value={budget?.uid} readOnly />
        <label htmlFor="description">
          <textarea name="income[description]" id="description" placeholder="Description" />
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
    </>
  );
}
