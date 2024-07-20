'use client';

import ErrorList from '@/components/ErrorList';
import SubmitFormButton from '@/components/SubmitFormButton';
import { createBudgetAction } from '@/server-actions/budget';
import { CreateBudgetState } from '@/types/budget';
import { useFormState } from 'react-dom';

const initState: CreateBudgetState = {
  budget: null,
  errorMessages: null,
};

export default function CreateNewBudgetForm() {
  const [formState, formAction] = useFormState(createBudgetAction, initState);

  if (formState.errorMessages)
    return <ErrorList errorMessages={formState.errorMessages} />;

  return (
    <form action={formAction}>
      <SubmitFormButton />
    </form>
  );
}
