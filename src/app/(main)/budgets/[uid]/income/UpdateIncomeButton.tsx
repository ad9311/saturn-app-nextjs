'use client';

import { useModalStore } from '@/stores/modal';
import { IncomeDb } from '@/types/transaction';

import TransactionModal from '../TransactionModal';

import UpdateIncomeForm from './UpdateIncomeForm';

export default function UpdateIncomeButton({ income }: { income: IncomeDb }) {
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));

  function handleOpenModal() {
    setModal(
      <TransactionModal title="Update Income">
        <UpdateIncomeForm income={income} />
      </TransactionModal>
    );
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      Update income
    </button>
  );
}
