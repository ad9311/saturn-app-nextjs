'use client';

import { useModalStore } from '@/stores/modal';

import TransactionModal from '../TransactionModal';

import NewExpenseCategoryForm from './NewExpenseCategoryForm';

export default function NewExpenseCategoryButton() {
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));

  function handleOpenModal() {
    setModal(
      <TransactionModal title="New expense category">
        <NewExpenseCategoryForm />
      </TransactionModal>
    );
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      New expense category
    </button>
  );
}
