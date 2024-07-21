'use client';

import { useModalStore } from '@/stores/modal';
import { useBudgetStore } from '@/stores/budget';
import TransactionModal from '../TransactionModal';
import NewIncomeForm from './NewIncomeForm';

export default function NewIncomeButton() {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenModal() {
    if (budget) {
      setChildren(
        <TransactionModal title="New Income">
          <NewIncomeForm budget={budget} />
        </TransactionModal>
      );
    }
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      New Income
    </button>
  );
}
