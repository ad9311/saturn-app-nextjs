'use client';

import { Expense } from '@prisma/client';
import { useFormState } from 'react-dom';

import ErrorList from '@/components/client/ErrorList';
import SubmitFormButton from '@/components/client/SubmitFormButton';
import { deleteExpenseAction } from '@/server-actions/expense';
import { useBudgetStore } from '@/stores/budget';
import { ExpenseFormState } from '@/types/transaction';

const initState: ExpenseFormState = {
  expense: null,
  errors: null,
};

export default function DeleteExpenseForm({ expense }: { expense: Expense }) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const [formState, formAction] = useFormState(deleteExpenseAction, initState);

  if (formState.expense && !formState.errors) {
    return <p>Income deleted successfully</p>;
  }

  return (
    <>
      <ErrorList errors={formState.errors} />
      <form action={formAction}>
        <input type="hidden" name="budget[uid]" value={budget?.uid} readOnly />
        <input type="hidden" name="expense[id]" value={expense.id} readOnly />
        <SubmitFormButton />
      </form>
    </>
  );
}
