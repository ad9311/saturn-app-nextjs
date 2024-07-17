import Modal from "@/components/Modal";
import useModalStore from "@/stores/modal";

export default function NewIncomeModal({ id }: { id: string }) {
  const { clearModalId } = useModalStore(state => ({ clearModalId: state.clearModalId }));

  function handleCloseIncomeForm() {
    clearModalId(id);
  }

  return (
    <Modal id={id}>
      <div className="flex items-center justify-between">
        <h3>New Income</h3>
        <button type="button" onClick={handleCloseIncomeForm}>CLOSE</button>
      </div>
      New form
    </Modal>
  )
}
