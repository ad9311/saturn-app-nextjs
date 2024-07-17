import Modal from '@/components/Modal';
import useModalStore from '@/stores/modal';
import NewIncomeForm from './NewIncomeForm';

export default function NewIncomeModal({ modalId }: { modalId: string }) {
  const { clearId } = useModalStore(state => ({
    clearId: state.clearId,
  }));

  function handleCloseIncomeForm() {
    clearId();
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
