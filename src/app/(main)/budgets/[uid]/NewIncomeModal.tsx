import { useModalStore } from '@/stores/modal';
import NewIncomeForm from './NewIncomeForm';
import { useBudgetStore } from '@/stores/budget';

export default function NewIncomeModal() {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));
  const { clearChildren } = useModalStore(state => ({
    clearChildren: state.clearChildren,
  }));

  function handleCloseModal() {
    clearChildren();
  }

  return (
    <div className="card modal">
      <div className="flex items-center justify-between">
        <h3>New Income</h3>
        <button type="button" className="font-bold" onClick={handleCloseModal}>
          X
        </button>
      </div>
      <NewIncomeForm budgetUid={budget?.uid as string} />
    </div>
  );
}
