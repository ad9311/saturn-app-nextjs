import Modal from '@/components/Modal';
import useModalStore from '@/stores/modal';
import NewIncomeForm from './NewIncomeForm';

export default function NewIncomeModal({ modalId }: { modalId: string }) {
  const { clearModalId } = useModalStore(state => ({
    clearModalId: state.clearModalId,
  }));

  function handleCloseIncomeForm() {
    clearModalId(modalId);
  }

  return (
    <Modal id={modalId} className="card modal">
      <div className="flex items-center justify-between">
        <h3>New Income</h3>
        <button type="button" onClick={handleCloseIncomeForm}>
          CLOSE
        </button>
      </div>
      <NewIncomeForm />
    </Modal>
  );
}
