import { PieChart } from 'react-chartkick';
import 'chartkick/chart.js';
import { BudgetPeriod } from '@/types/client/budget-period';

export default function BudgetPeriodPieChart({
  budgetPeriod,
}: {
  budgetPeriod: BudgetPeriod;
}) {
  return (
    <div>
      <h3 className="text-center">
        {budgetPeriod.month}-{budgetPeriod.year}
      </h3>
      <div className="xl:max-w-[30rem]">
        <PieChart
          data={[
            ['Blueberry', 44],
            ['Strawberry', 23],
          ]}
        />
      </div>
    </div>
  );
}
