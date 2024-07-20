'use client';

import { createBudgetAction } from '@/server-actions/budget';
import { useFormState } from 'react-dom';

const initState = {
  budget: null,
  error: null,
};

export default function CreateNewBudgetForm() {
  const [state, formAction] = useFormState(createBudgetAction, initState);

  if (!state) return null;

  return (
    <form action={formAction}>
      <button type="submit" name="submit">
        Create new budget!
      </button>
    </form>
  );
}
