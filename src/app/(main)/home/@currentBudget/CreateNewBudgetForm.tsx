'use client';

import SubmitFormButton from '@/components/SubmitFormButton';
import { createBudgetAction } from '@/server-actions/budget';
import { useFormState, useFormStatus } from 'react-dom';

const initState = {
  budget: null,
  error: null,
};

export default function CreateNewBudgetForm() {
  const [formState, formAction] = useFormState(createBudgetAction, initState);

  if (formState.error) return <p>Error: {formState.error.message}!</p>;

  return (
    <form action={formAction}>
      <SubmitFormButton />
    </form>
  );
}
