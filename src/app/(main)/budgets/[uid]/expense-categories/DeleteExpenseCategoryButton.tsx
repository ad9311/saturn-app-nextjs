import { useModalStore } from '@/stores/modal';
import { ExpenseCategoryDb } from '@/types/expense-category';

import TransactionModal from '../TransactionModal';

import DeleteExpenseCategoryForm from './DeleteExpenseCategoryForm';

export default function DeleteExpenseCategoryButton({
  expenseCategory,
}: {
  expenseCategory: ExpenseCategoryDb;
}) {
  const { setModal } = useModalStore(state => ({
    setModal: state.setModal,
  }));

  function handleOpenModal() {
    setModal(
      <TransactionModal title="Update expense category">
        <DeleteExpenseCategoryForm expenseCategory={expenseCategory} />
      </TransactionModal>
    );
  }

  return (
    <button type="button" onClick={handleOpenModal}>
      Delete
    </button>
  );
}
