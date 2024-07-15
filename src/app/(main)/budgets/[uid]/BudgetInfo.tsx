import Budget from '@/types/client/budget';

export default function BudgetInfo({ budget }: { budget: Budget }) {
  return (
    <section>
      <h2>
        {budget.month}/{budget.year}
      </h2>
      <p>{budget.balance}</p>
      <div className="flex items-center gap-2">
        <p>{budget.totalIncome}</p>
        <p>{budget.totalExpenses}</p>
      </div>
      <div className="flex items-center gap-2">
        <p>{budget.transactionCount}</p>
        <p>{budget.incomeCount}</p>
        <p>{budget.expenseCount}</p>
      </div>
    </section>
  );
}
