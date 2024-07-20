'use client';

import { createBudgetAction } from '@/server-actions/budget';
import { useFormState } from 'react-dom';

const initState = {
  budget: null,
  error: null,
};

export default function CreateNewBudgetForm() {
  const [state, formAction] = useFormState(createBudgetAction, initState);

  if (state.error) return <p>Error: {state.error.message}!</p>;

  return (
    <form action={formAction}>
      <button type="submit" name="submit">
        Create new budget!
      </button>
    </form>
  );
}
