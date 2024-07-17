import Modal from '@/components/Modal';
import useModalStore from '@/stores/modal';
import Budget from '@/types/client/budget';

export default function BudgetInfo({ budget }: { budget: Budget }) {
  const { setModalId, clearModalId } = useModalStore(state => ({
    setModalId: state.setModalId,
    clearModalId: state.clearModalId,
  }));

  return (
    <section>
      <h2>
        {budget.month}/{budget.year}
      </h2>
      <ul>
        <li>
          <button type="button" onClick={() => setModalId('new-income-form')}>
            New income
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setModalId('new-expense-form')}>
            New expense
          </button>
        </li>
      </ul>
      <p>Balance: {budget.balance}</p>
      <div className="flex items-center gap-2">
        <p>Total income: {budget.totalIncome}</p>
        <p>Total expenses: {budget.totalExpenses}</p>
      </div>
      <div className="flex items-center gap-2">
        <p>Transaction count:{budget.transactionCount}</p>
        <p>Income count: {budget.incomeCount}</p>
        <p>Expense count: {budget.expenseCount}</p>
      </div>
      <Modal id="new-income-form">
        <button type="button" onClick={() => clearModalId('new-income-form')}>
          CLOSE
        </button>
      </Modal>
      <Modal id="new-expense-form">
        <button type="button" onClick={() => clearModalId('new-expense-form')}>
          CLOSE
        </button>
      </Modal>
    </section>
  );
}
