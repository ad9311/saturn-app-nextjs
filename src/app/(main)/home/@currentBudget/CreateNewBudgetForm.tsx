'use client';

import SubmitFormButton from '@/components/SubmitFormButton';
import { createBudgetAction } from '@/server-actions/budget';
import { useFormState, useFormStatus } from 'react-dom';

const initState = {
  budget: null,
  error: null,
};

export default function CreateNewBudgetForm() {
  const [state, formAction] = useFormState(createBudgetAction, initState);

  if (state.error) return <p>Error: {state.error.message}!</p>;

  return (
    <form action={formAction}>
      <SubmitFormButton />
    </form>
  );
}
