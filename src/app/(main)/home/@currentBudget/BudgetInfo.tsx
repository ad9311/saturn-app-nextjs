import Amount from '@/components/Amount';
import { BudgetDb } from '@/types/budget';

export default function BudgetInfo({ budget }: { budget: BudgetDb }) {
  return (
    <div className="flex justify-between items-center gap-1 text-lg">
      <p className="subtitle">
        0{budget.month}/{budget.year}
      </p>
      <p>
        <Amount value={budget.balance} />
      </p>
    </div>
  );
}
