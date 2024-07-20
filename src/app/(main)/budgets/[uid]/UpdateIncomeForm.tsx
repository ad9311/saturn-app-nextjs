import ErrorList from '@/components/ErrorList';
import SubmitFormButton from '@/components/SubmitFormButton';
import { updateIncomeAction } from '@/server-actions/income';
import { BudgetDb } from '@/types/budget';
import { IncomeDb, IncomeFormState } from '@/types/transaction';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

const initState: IncomeFormState = {
  income: null,
  errorMessages: null,
};

export default function UpdateIncomeForm({
  budget,
  income,
}: {
  budget: BudgetDb;
  income: IncomeDb;
}) {
  const [formState, formAction] = useFormState(updateIncomeAction, initState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.income && !formState.errorMessages) {
      ref.current?.reset();
    }
  }, [formState]);

  return (
    <>
      <ErrorList errorMessages={formState.errorMessages} />
      <form action={formAction} ref={ref}>
        <input type="hidden" name="budget[uid]" value={budget.uid} readOnly />
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
