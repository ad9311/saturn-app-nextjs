'use client';

import { useFormState } from 'react-dom';

import ErrorList from '@/components/ErrorList';
import SubmitFormButton from '@/components/SubmitFormButton';
import { deleteIncomeAction } from '@/server-actions/income';
import { useBudgetStore } from '@/stores/budget';
import { IncomeDb, IncomeFormState } from '@/types/transaction';

const initState: IncomeFormState = {
  income: null,
  errorMessages: null,
};

export default function DeleteIncomeForm({ income }: { income: IncomeDb }) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const [formState, formAction] = useFormState(deleteIncomeAction, initState);

  if (formState.income && !formState.errorMessages) {
    return <p>Income deleted successfully</p>;
  }

  return (
    <>
      <ErrorList errorMessages={formState.errorMessages} />
      <form action={formAction}>
        <input type="hidden" name="budget[uid]" value={budget?.uid} readOnly />
        <input type="hidden" name="income[id]" value={income.id} readOnly />
        <SubmitFormButton />
      </form>
    </>
  );
}
