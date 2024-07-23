'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import ErrorList from '@/components/client/ErrorList';
import SubmitFormButton from '@/components/client/SubmitFormButton';
import { createExpenseCategoryAction } from '@/server-actions/expense-category';
import { useExpenseCategoriesStore } from '@/stores/expense-categories';
import { useModalStore } from '@/stores/modal';
import { ExpenseCategoryFormState } from '@/types/expense-category';

import TransactionModal from '../TransactionModal';

type NewExpenseCategoryFormProps = {
  openModalOnSubmit?: boolean;
  modalContent?: React.ReactNode;
};

const initState: ExpenseCategoryFormState = {
  expenseCategory: null,
  errors: null,
};

export default function NewExpenseCategoryForm({
  openModalOnSubmit,
  modalContent,
}: NewExpenseCategoryFormProps) {
  const { addExpenseCategory } = useExpenseCategoriesStore(state => ({
    addExpenseCategory: state.addExpenseCategory,
  }));
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));
  const [formState, formAction] = useFormState(createExpenseCategoryAction, initState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.expenseCategory && !formState.errors) {
      addExpenseCategory(formState.expenseCategory);
      if (openModalOnSubmit) {
        setModal(<TransactionModal title="New Expense">{modalContent}</TransactionModal>);
      } else {
        ref.current?.reset();
      }
    }
  }, [formState]);

  return (
    <>
      <ErrorList errors={formState.errors} />
      <form action={formAction} ref={ref}>
        <label htmlFor="name">
          <input type="text" name="expense_category[name]" id="name" placeholder="Name" />
        </label>
        <label htmlFor="color">
          <input type="color" name="expense_category[color]" id="color" defaultValue="#c1c1c1" />
        </label>
        <SubmitFormButton />
      </form>
    </>
  );
}
