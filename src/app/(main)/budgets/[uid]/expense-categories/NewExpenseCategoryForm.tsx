import { useEffect, useRef } from 'react';
import ErrorList from '@/components/ErrorList';
import SubmitFormButton from '@/components/SubmitFormButton';
import { useBudgetStore } from '@/stores/budget';
import { useExpenseCategoriesStore } from '@/stores/expense-categories';
import { useModalStore } from '@/stores/modal';
import { useFormState } from 'react-dom';
import TransactionModal from '../TransactionModal';
import { createExpenseCategoryAction } from '@/server-actions/expense-category';
import { ExpenseCategoryFormState } from '@/types/expense-category';

const initState: ExpenseCategoryFormState = {
  expenseCategory: null,
  errorMessages: null,
};

export default function NewExpenseCategoryForm() {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  // const { expenseCategories } = useExpenseCategoriesStore(state => ({
  //   expenseCategories: state.expenseCategories,
  // }));
  // const { setChildren } = useModalStore(state => ({
  //   setChildren: state.setChildren,
  // }));
  const [formState, formAction] = useFormState(
    createExpenseCategoryAction,
    initState
  );
  const ref = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   if (formState.expense && !formState.errorMessages) {
  //     ref.current?.reset();
  //   }
  // }, [formState]);

  return (
    <>
      <ErrorList errorMessages={formState.errorMessages} />
      <form action={formAction} ref={ref}>
        <input type="hidden" name="budget[uid]" value={budget?.uid} readOnly />
        <label htmlFor="name">
          <input
            type="text"
            name="expense_category[name]"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="amount">
          <input type="color" name="expense_category[color]" id="amount" />
        </label>
        <SubmitFormButton />
      </form>
    </>
  );
}
