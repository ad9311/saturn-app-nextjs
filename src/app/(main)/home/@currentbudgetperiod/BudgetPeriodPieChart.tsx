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
    maintainAspectRatio: true,
  };

 return (
  <div>
    {budgetPeriod.month}-{budgetPeriod.year}
    <div className="relative mx-auto w-[65vw] h-[30vh] md:h-[40vh] lg:w-[25vw] lg:h-[30vh] xl:w-[20vw] xl:h-[40vh]">
      <PieChart data={data} options={options} />
    </div>
  </div>
  );
}
