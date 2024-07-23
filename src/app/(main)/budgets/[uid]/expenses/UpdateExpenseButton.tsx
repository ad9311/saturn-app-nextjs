'use client';

import { Expense } from '@prisma/client';

import { useModalStore } from '@/stores/modal';

import TransactionModal from '../TransactionModal';

import UpdateExpenseForm from './UpdateExpenseForm';

export default function UpdateExpenseButton({ expense }: { expense: Expense }) {
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));

  function handleOpenModal() {
    setModal(
      <TransactionModal title="Update Expense">
        <UpdateExpenseForm expense={expense} />
      </TransactionModal>
    );
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      Update expense
    </button>
  );
}
