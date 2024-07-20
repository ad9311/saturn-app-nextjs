'use client';

import { createBudgetAction } from '@/server-actions/budget';
import { useFormState, useFormStatus } from 'react-dom';

const initState = {
  budget: null,
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

export default function CreateNewBudgetForm() {
  const [state, formAction] = useFormState(createBudgetAction, initState);

  if (state.error) return <p>Error: {state.error.message}!</p>;

  return (
    <form action={formAction}>
      <SubmitFormButton />
    </form>
  );
}
