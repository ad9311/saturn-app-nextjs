'use client';

import { useFormState } from 'react-dom';

import ErrorList from '@/components/client/ErrorList';
import SubmitFormButton from '@/components/client/SubmitFormButton';
import { createBudgetAction } from '@/server-actions/budget';
import { CreateBudgetState } from '@/types/budget';

const initState: CreateBudgetState = {
  budget: null,
  errors: null,
};

export default function CreateNewBudgetForm() {
  const [formState, formAction] = useFormState(createBudgetAction, initState);

  if (formState.errors) {
    return <ErrorList errors={formState.errors} />;
  }

  return (
    <form action={formAction}>
      <SubmitFormButton />
    </form>
  );
}
