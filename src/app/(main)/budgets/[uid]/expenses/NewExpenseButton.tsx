'use client';

import { useModalStore } from '@/stores/modal';

import TransactionModal from '../TransactionModal';

import NewExpenseForm from './NewExpenseForm';

export default function NewExpenseButton() {
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenModal() {
    setChildren(
      <TransactionModal title="New Expense">
        <NewExpenseForm />
      </TransactionModal>
    );
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      New Expense
    </button>
  );
}
