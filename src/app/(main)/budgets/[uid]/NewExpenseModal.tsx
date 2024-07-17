import useModalStore from '@/stores/modal';
import NewExpenseForm from './NewExpenseForm';

export default function NewExpenseModal() {
  const { clearChildren } = useModalStore(state => ({
    clearChildren: state.clearChildren,
  }));

  function handleCloseExpenseForm() {
    clearChildren();
  }

  return (
    <div className="card modal">
      <div className="flex items-center justify-between">
        <h3>New Expense</h3>
        <button type="button" onClick={handleCloseExpenseForm}>
          CLOSE
        </button>
      </div>
      <NewExpenseForm />
    </div>
  );
}
