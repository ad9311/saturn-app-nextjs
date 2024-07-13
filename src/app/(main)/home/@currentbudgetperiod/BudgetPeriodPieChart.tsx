import PieChart from '@/components/charts/PieChart';
import { BudgetPeriod } from '@/types/client/budget-period';
import { ChartData, ChartOptions } from 'chart.js';

export default function BudgetPeriodPieChart({
  budgetPeriod,
}: {
  budgetPeriod: BudgetPeriod;
}) {
  const data: ChartData<'pie'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Prueba',
        data: [5, 2, 4, 10, 5],
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Current Budget Period',
      },
    },
  };

  return (
    <div>
      {budgetPeriod.month}-{budgetPeriod.year}
      <PieChart data={data} options={options} />
    </div>
  );
}
