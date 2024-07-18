import useModalStore from '@/stores/modal';
import NewExpenseModal from './NewExpenseModal';
import NewExpenseCategoryForm from './NewExpenseCategoryForm';

export default function NewExpenseCategoryModal({
  returnToNewExpense,
}: {
  returnToNewExpense?: boolean;
}) {
  const { setChildren, clearChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
    clearChildren: state.clearChildren,
  }));

  function handleCloseIncomeForm() {
    if (returnToNewExpense) {
      setChildren(<NewExpenseModal />);
    }

    clearChildren();
  }

  return (
    <div className="card modal">
      <div className="flex items-center justify-between">
        <h3>New expense category</h3>
        <button type="button" onClick={handleCloseIncomeForm}>
          CLOSE
        </button>
      </div>
      <NewExpenseCategoryForm />
    </div>
  );
}
