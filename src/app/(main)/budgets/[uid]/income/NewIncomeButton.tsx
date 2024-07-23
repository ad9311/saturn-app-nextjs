'use client';

import { useModalStore } from '@/stores/modal';

import TransactionModal from '../TransactionModal';

import NewIncomeForm from './NewIncomeForm';

export default function NewIncomeButton() {
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));

  function handleOpenModal() {
    setModal(
      <TransactionModal title="New Income">
        <NewIncomeForm />
      </TransactionModal>
    );
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      New Income
    </button>
  );
}
