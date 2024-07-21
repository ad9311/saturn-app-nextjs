import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import ErrorList from '@/components/ErrorList';
import SubmitFormButton from '@/components/SubmitFormButton';
import { createExpenseAction } from '@/server-actions/expense';
import { useBudgetStore } from '@/stores/budget';
import { useExpenseCategoriesStore } from '@/stores/expense-categories';
import { useModalStore } from '@/stores/modal';
import { ExpenseFormState } from '@/types/transaction';

import NewExpenseCategoryForm from '../expense-categories/NewExpenseCategoryForm';
import TransactionModal from '../TransactionModal';

const initState: ExpenseFormState = {
  expense: null,
  errorMessages: null,
};

export default function NewExpenseForm() {
  const [formState, formAction] = useFormState(createExpenseAction, initState);
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const { expenseCategories } = useExpenseCategoriesStore(state => ({
    expenseCategories: state.expenseCategories,
  }));
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.expense && !formState.errorMessages) {
      ref.current?.reset();
    }
  }, [formState]);

  function handleOpenCategoryForm() {
    setChildren(
      <TransactionModal title="New expense categoría">
        <NewExpenseCategoryForm />
      </TransactionModal>
    );
  }

  const mappedExpenseCategories = expenseCategories.map(expenseCategory => (
    <option key={expenseCategory.id} value={expenseCategory.id}>
      {expenseCategory.name}
    </option>
  ));

  return (
    <>
      <ErrorList errorMessages={formState.errorMessages} />
      <form action={formAction} ref={ref}>
        <input type="hidden" name="budget[uid]" value={budget?.uid} readOnly />
        <label htmlFor="description">
          <textarea
            name="expense[description]"
            id="description"
            placeholder="Description"
          />
        </label>
        <label htmlFor="expense_category">
          <select name="expense_category[id]" id="expense_category">
            {mappedExpenseCategories}
          </select>
          <button type="button" onClick={handleOpenCategoryForm}>
            Create a new category
          </button>
        </label>
        <label htmlFor="amount">
          <input
            type="number"
            name="expense[amount]"
            id="amount"
            placeholder="Amount"
            min={1}
            step={0.01}
          />
        </label>
        <SubmitFormButton />
      </form>
    </>
  );
}
