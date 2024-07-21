'use client';

import { useModalStore } from '@/stores/modal';
import { IncomeDb } from '@/types/transaction';
import TransactionModal from './TransactionModal';
import { useBudgetStore } from '@/stores/budget';
import DeleteIncomeForm from './DeleteIncomeForm';

export default function DeleteIncomeButton({ income }: { income: IncomeDb }) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenModal() {
    if (budget) {
      setChildren(
        <TransactionModal title="Update Income">
          <DeleteIncomeForm budget={budget} income={income} />
        </TransactionModal>
      );
    }
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      Delete income
    </button>
  );
}
