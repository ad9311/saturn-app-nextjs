'use client';

import { useModalStore } from '@/stores/modal';
import { IncomeDb } from '@/types/transaction';
import TransactionModal from './TransactionModal';
import UpdateIncomeForm from './UpdateIncomeForm';
import { useBudgetStore } from '@/stores/budget';

export default function UpdateIncomeButton({ income }: { income: IncomeDb }) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenModal() {
    if (budget) {
      setChildren(
        <TransactionModal title="Update Income">
          <UpdateIncomeForm budget={budget} income={income} />
        </TransactionModal>
      );
    }
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      Update income
    </button>
  );
}
