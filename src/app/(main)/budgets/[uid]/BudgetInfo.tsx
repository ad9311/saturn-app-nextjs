import Budget from '@/types/client/budget';

export default function BudgetInfo({ budget }: { budget: Budget }) {
  return (
    <section>
      <h2>
        {budget.month}/{budget.year}
      </h2>
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
