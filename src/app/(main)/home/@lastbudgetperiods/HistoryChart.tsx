import { ChartData, ChartOptions } from 'chart.js';
import LineChart from '@/components/charts/LineChart';
import { BudgetPeriod } from '@/types/client/budget-period';

export default function HistoryChart({
  budgetPeriods,
}: {
  budgetPeriods: BudgetPeriod[];
}) {

  const data: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Prueba',
        data: [5, 2, 4, 10, 5]
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    elements: { line: { tension: 0.2 }},
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          padding: 1,
        },
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Last Budget Periods',
      },
    },
  }

  return (
    <LineChart data={data} options={options} />
  );
}
