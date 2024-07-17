import useModalStore from '@/stores/modal';
import NewIncomeForm from './NewIncomeForm';

export default function NewIncomeModal() {
  const { clearChildren } = useModalStore(state => ({
    clearChildren: state.clearChildren,
  }));

  function handleCloseIncomeForm() {
    clearChildren();
  }

  return (
    <div className="card modal">
      <div className="flex items-center justify-between">
        <h3>New Income</h3>
        <button type="button" onClick={handleCloseIncomeForm}>
          CLOSE
        </button>
      </div>
      <NewIncomeForm />
    </div>
  );
}
