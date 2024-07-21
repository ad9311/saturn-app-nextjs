import { BudgetDb } from '@/types/budget';

type BudgetInfoProps = React.HTMLAttributes<HTMLDivElement> & {
  budget: BudgetDb;
};

export default function BudgetInfo({ budget, ...props }: BudgetInfoProps) {
  return (
    <div {...props}>
      <section>
        <h2>
          {budget.month}/{budget.year}
        </h2>
        <p>Balance: {budget.balance.toFixed(2)}</p>
        <div className="flex items-center gap-2">
          <p>Total income: {budget.totalIncome.toFixed(2)}</p>
          <p>Total expenses: {budget.totalExpenses.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>Transaction count:{budget.transactionCount}</p>
          <p>Income count: {budget.incomeCount}</p>
          <p>Expense count: {budget.expenseCount}</p>
        </div>
      </section>
    </div>
  );
}
