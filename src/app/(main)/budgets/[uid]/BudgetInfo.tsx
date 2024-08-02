import { BudgetDb } from '@/types/budget';

type BudgetInfoProps = React.HTMLAttributes<HTMLDivElement> & {
  budget: BudgetDb;
};

export default function BudgetInfo({ budget, ...props }: BudgetInfoProps) {
  return (
    <div {...props}>
      <section className="mb-4">
        <h2 className="title">
          {budget.month}/{budget.year}
        </h2>
        <p className="w-fit py-2 px-4 my-4 mx-auto bg-white border rounded text-2xl">
          Balance: <span className="text-green-700">${budget.balance.toFixed(2)}</span>
        </p>
        <div className="grid grid-cols-2 gap-4 content-center text-center text-lg">
          <p className="py-2 px-4 bg-white border rounded">
            Total income: <span className="text-green-700">${budget.totalIncome.toFixed(2)}</span>
          </p>
          <p className="py-2 px-4 bg-white border rounded">
            Total expenses: <span className="text-red-700">${budget.totalExpenses.toFixed(2)}</span>
          </p>
        </div>
        <div className="mt-8 subtitle">
          <p>Transaction count: <span className="text-slate-700">{budget.transactionCount}</span></p>
          <p>Income count: <span className="text-slate-700">{budget.incomeCount}</span></p>
          <p>Expense count: <span className="text-slate-700">{budget.expenseCount}</span></p>
        </div>
      </section>
    </div>
  );
}
