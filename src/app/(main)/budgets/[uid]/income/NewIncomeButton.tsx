'use client';

import { useModalStore } from '@/stores/modal';

import TransactionModal from '../TransactionModal';

import NewIncomeForm from './NewIncomeForm';

export default function NewIncomeButton() {
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenModal() {
    setChildren(
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
