import ErrorList from '@/components/ErrorList';
import SubmitFormButton from '@/components/SubmitFormButton';
import { createExpenseAction } from '@/server-actions/expense';
import { BudgetDb } from '@/types/budget';
import { ExpenseFormState } from '@/types/transaction';
import React, { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

const initState: ExpenseFormState = {
  expense: null,
  errorMessages: null,
};

export default function NewExpenseForm({ budget }: { budget: BudgetDb }) {
  const [formState, formAction] = useFormState(createExpenseAction, initState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.expense && !formState.errorMessages) {
      ref.current?.reset();
    }
  }, [formState]);

  return (
    <>
      <ErrorList errorMessages={formState.errorMessages} />
      <form action={formAction} ref={ref}>
        <input type="hidden" name="budget[uid]" value={budget.uid} readOnly />
        <label htmlFor="description">
          <textarea
            name="expense[description]"
            id="description"
            placeholder="Description"
          />
        </label>
        <label htmlFor="amount">
          <input
            type="number"
            name="expense[amount]"
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
