import useModalStore from '@/stores/modal';
import Budget from '@/types/client/budget';
import NewIncomeModal from './NewIncomeModal';
import NewExpenseModal from './NewExpenseModal';

export default function BudgetInfo({ budget }: { budget: Budget }) {
  const { setChildren } = useModalStore(state => ({
    setChildren: state.setChildren,
  }));

  function handleOpenIncomeForm() {
    setChildren(<NewIncomeModal />);
  }

  function handleOpenExpenseForm() {
    setChildren(<NewExpenseModal />);
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
    </section>
  );
}
