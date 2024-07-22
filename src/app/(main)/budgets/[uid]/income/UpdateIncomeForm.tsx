'use client';

import { useFormState } from 'react-dom';

import ErrorList from '@/components/ErrorList';
import SubmitFormButton from '@/components/SubmitFormButton';
import { updateIncomeAction } from '@/server-actions/income';
import { useBudgetStore } from '@/stores/budget';
import { IncomeDb, IncomeFormState } from '@/types/transaction';

const initState: IncomeFormState = {
  income: null,
  errorMessages: null,
};

export default function UpdateIncomeForm({ income }: { income: IncomeDb }) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const [formState, formAction] = useFormState(updateIncomeAction, initState);

  if (formState.income && !formState.errorMessages) {
    return <p>Income updated successfully</p>;
  }

  return (
    <>
      <ErrorList errorMessages={formState.errorMessages} />
      <form action={formAction}>
        <input type="hidden" name="budget[uid]" value={budget?.uid} readOnly />
        <input type="hidden" name="income[id]" value={income.id} readOnly />
        <label htmlFor="description">
          <textarea
            name="income[description]"
            id="description"
            placeholder="Description"
            defaultValue={income.description}
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
            defaultValue={income.amount}
          />
        </label>
        <SubmitFormButton />
      </form>
    </>
  );
}
