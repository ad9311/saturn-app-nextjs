'use client';

import { useModalStore } from '@/stores/modal';

import TransactionModal from '../TransactionModal';

import ExpenseCategoryList from './ExpenseCategoryList';

export default function OpenExpenseCategoryList() {
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));

  function handleOpenModal() {
    setModal(
      <TransactionModal title="Expense categories">
        <ExpenseCategoryList />
      </TransactionModal>
    );
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      Expense categories
    </button>
  );
}
