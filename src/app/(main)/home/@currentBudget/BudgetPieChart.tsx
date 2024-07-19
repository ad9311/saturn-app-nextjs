import { Budget } from '@prisma/client';

export default function BudgetPieChart({ budget }: { budget: Budget }) {
  return (
    <div>
      <h2 className="text-lg font-bold">
        Current budget is: {budget.month}/{budget.year}
      </h2>
    </div>
  );
}
