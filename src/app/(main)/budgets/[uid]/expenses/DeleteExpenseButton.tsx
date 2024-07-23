'use client';

import { Expense } from '@prisma/client';

import { useModalStore } from '@/stores/modal';

import TransactionModal from '../TransactionModal';

import DeleteExpenseForm from './DeleteExpenseForm';

export default function DeleteExpenseButton({ expense }: { expense: Expense }) {
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));

  function handleOpenModal() {
    setModal(
      <TransactionModal title="Update Income">
        <DeleteExpenseForm expense={expense} />
      </TransactionModal>
    );
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      Delete expense
    </button>
  );
}
