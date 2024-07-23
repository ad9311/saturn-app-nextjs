'use client';

import { useModalStore } from '@/stores/modal';
import { IncomeDb } from '@/types/transaction';

import TransactionModal from '../TransactionModal';

import DeleteIncomeForm from './DeleteIncomeForm';

export default function DeleteIncomeButton({ income }: { income: IncomeDb }) {
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));

  function handleOpenModal() {
    setModal(
      <TransactionModal title="Update Income">
        <DeleteIncomeForm income={income} />
      </TransactionModal>
    );
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      Delete income
    </button>
  );
}
