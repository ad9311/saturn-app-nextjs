import { ChartData, ChartOptions, Tick } from 'chart.js';
import LineChart from '@/components/charts/LineChart';
import { BudgetPeriod } from '@/types/client/budget-period';
import {
  balanceChartData,
  chartDateLables,
  expensesChartData,
  incomeChartData,
} from '@/helpers/charts';

export default function HistoryChart({
  budgetPeriods,
}: {
  budgetPeriods: BudgetPeriod[];
}) {
  const labels = chartDateLables(budgetPeriods);
  const balanceData = balanceChartData(budgetPeriods);
  const incomeData = incomeChartData(budgetPeriods);
  const expensesData = expensesChartData(budgetPeriods);

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Balance',
        data: balanceData,
      },
      {
        label: 'Income',
        data: incomeData,
      },
      {
        label: 'Expenses',
        data: expensesData,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    elements: { line: { tension: 0.4 } },
    scales: {
      y: {
        min: 0,
        max: 2000,
        ticks: {
          stepSize: 500,
          callback: function (
            value: string | number,
            index: number,
            ticks: Tick[],
          ) {
            index;
            ticks;
            return '$' + value;
          },
          padding: 8,
        },
      },
      x: {
        ticks: {
          padding: 8,
          color: '#4A4A4A',
        },
      },
    },
  };

  return (
    <div className="relative mx-auto w-[90vw] h-[30vh] md:h-[40vh] lg:w-[50vw] lg:h-[30vh] xl:w-[55vw] xl:h-[40vh]">
      <LineChart data={chartData} options={options} />
    </div>
  );
}
