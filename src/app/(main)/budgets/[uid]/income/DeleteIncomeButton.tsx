'use client';

import { useModalStore } from '@/stores/modal';
import { IncomeDb } from '@/types/transaction';

import TransactionModal from '../TransactionModal';

import DeleteIncomeForm from './DeleteIncomeForm';

export default function DeleteIncomeButton({ income }: { income: IncomeDb }) {
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenModal() {
    setChildren(
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
