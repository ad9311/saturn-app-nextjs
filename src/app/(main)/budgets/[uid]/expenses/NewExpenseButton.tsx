'use client';

import { useModalStore } from '@/stores/modal';
import { useBudgetStore } from '@/stores/budget';
import TransactionModal from '../TransactionModal';
import NewExpenseForm from './NewExpenseForm';

export default function NewExpenseButton() {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenModal() {
    if (budget) {
      setChildren(
        <TransactionModal title="New Expense">
          <div></div>
          <NewExpenseForm budget={budget} />
        </TransactionModal>
      );
    }
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      New Expense
    </button>
  );
}
