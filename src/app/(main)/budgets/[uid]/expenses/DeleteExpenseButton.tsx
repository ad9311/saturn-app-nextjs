'use client';

import { useModalStore } from '@/stores/modal';
import TransactionModal from '../TransactionModal';
import { Expense } from '@prisma/client';
import DeleteExpenseForm from './DeleteExpenseForm';

export default function DeleteExpenseButton({ expense }: { expense: Expense }) {
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenModal() {
    setChildren(
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
