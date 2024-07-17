import Modal from '@/components/Modal';
import useModalStore from '@/stores/modal';
import Budget from '@/types/client/budget';
import NewIncomeModal from './NewIncomeModal';
import NewExpenseModal from './NewExpenseModal';

const incomeModalId = 'new-income-form';
const expenseModalId = 'new-expense-form';

export default function BudgetInfo({ budget }: { budget: Budget }) {
  const { setId } = useModalStore(state => ({
    setId: state.setId,
  }));

  function handleOpenIncomeForm() {
    setId(incomeModalId);
  }

  function handleOpenExpenseForm() {
    setId(expenseModalId);
  }

  return (
    <section>
      <h2>
        {budget.month}/{budget.year}
      </h2>
      <ul>
        <li>
          <button type="button" onClick={handleOpenIncomeForm}>
            New income
          </button>
        </li>
        <li>
          <button type="button" onClick={handleOpenExpenseForm}>
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
      <NewIncomeModal modalId={incomeModalId} />
      <NewExpenseModal modalId={expenseModalId} />
    </section>
  );
}
