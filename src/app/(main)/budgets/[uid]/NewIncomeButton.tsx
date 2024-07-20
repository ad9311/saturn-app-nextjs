'use client';

import { useModalStore } from '@/stores/modal';
import NewIncomeModal from './NewIncomeModal';

export default function NewIncomeButton() {
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenModal() {
    setChildren(<NewIncomeModal />);
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      New Income
    </button>
  );
}
