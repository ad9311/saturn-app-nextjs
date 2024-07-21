'use client';

import { useModalStore } from '@/stores/modal';
import { IncomeDb } from '@/types/transaction';
import TransactionModal from '../TransactionModal';
import UpdateIncomeForm from './UpdateIncomeForm';

export default function UpdateIncomeButton({ income }: { income: IncomeDb }) {
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenModal() {
    setChildren(
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
