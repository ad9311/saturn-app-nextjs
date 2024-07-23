'use client';

import { useModalStore } from '@/stores/modal';
import { ExpenseCategoryDb } from '@/types/expense-category';

import TransactionModal from '../TransactionModal';

import UpdateExpenseCategoryForm from './UpdateExpenseCategoryForm';

export default function UpdateExpenseCategoryButton({
  expenseCategory,
}: {
  expenseCategory: ExpenseCategoryDb;
}) {
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));

  function handleOpenModal() {
    setModal(
      <TransactionModal title="Update expense category">
        <UpdateExpenseCategoryForm expenseCategory={expenseCategory} />
      </TransactionModal>
    );
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      Update expense category
    </button>
  );
}
