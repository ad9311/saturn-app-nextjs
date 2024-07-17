import Modal from '@/components/Modal';
import useModalStore from '@/stores/modal';
import NewExpenseForm from './NewExpenseForm';

export default function NewExpenseModal({ modalId }: { modalId: string }) {
  const { clearModalId } = useModalStore(state => ({
    clearModalId: state.clearModalId,
  }));

  function handleCloseExpenseForm() {
    clearModalId(modalId);
  }

  return (
    <Modal id={modalId} className="card modal">
      <div className="flex items-center justify-between">
        <h3>New Expense</h3>
        <button type="button" onClick={handleCloseExpenseForm}>
          CLOSE
        </button>
      </div>
      <NewExpenseForm />
    </Modal>
  );
}
