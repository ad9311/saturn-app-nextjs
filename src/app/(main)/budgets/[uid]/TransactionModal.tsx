import React from 'react';

import { useModalStore } from '@/stores/modal';

export default function TransactionModal({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const { clearChildren } = useModalStore(state => ({
    clearChildren: state.clearChildren,
  }));

  function handleCloseModal() {
    clearChildren();
  }

  return (
    <div className="card modal">
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
        <button type="button" className="font-bold" onClick={handleCloseModal}>
          X
        </button>
      </div>
      {children}
    </div>
  );
}
