'use client';

import { Expense } from '@prisma/client';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import ErrorList from '@/components/client/ErrorList';
import SubmitFormButton from '@/components/client/SubmitFormButton';
import { updateExpenseAction } from '@/server-actions/expense';
import { useBudgetStore } from '@/stores/budget';
import { useExpenseCategoriesStore } from '@/stores/expense-categories';
import { useModalStore } from '@/stores/modal';
import { ExpenseFormState } from '@/types/transaction';

import NewExpenseCategoryForm from '../expense-categories/NewExpenseCategoryForm';
import TransactionModal from '../TransactionModal';

const initState: ExpenseFormState = {
  expense: null,
  errors: null,
};

export default function UpdateExpenseForm({ expense }: { expense: Expense }) {
  const [formState, formAction] = useFormState(updateExpenseAction, initState);
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const { expenseCategories } = useExpenseCategoriesStore(state => ({
    expenseCategories: state.expenseCategories,
  }));
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.expense && !formState.errors) {
      ref.current?.reset();
    }
  }, [formState]);

  function handleOpenCategoryForm() {
    setModal(
      <TransactionModal title="New expense categoría">
        <NewExpenseCategoryForm
          openModalOnSubmit
          modalContent={<UpdateExpenseForm expense={expense} />}
        />
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
      <ErrorList errors={formState.errors} />
      <form action={formAction} ref={ref}>
        <input type="hidden" name="budget[uid]" value={budget?.uid} readOnly />
        <input type="hidden" name="expense[id]" value={expense.id} readOnly />
        <label htmlFor="description">
          <textarea
            name="expense[description]"
            id="description"
            placeholder="Description"
            defaultValue={expense.description}
          />
        </label>
        <label htmlFor="expense_category">
          <select
            name="expense_category[id]"
            id="expense_category"
            defaultValue={expense.expenseCategoryId}>
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
            defaultValue={expense.amount}
          />
        </label>
        <SubmitFormButton />
      </form>
    </>
  );
}
