import { ChartData, ChartOptions } from 'chart.js';
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
    elements: { line: { tension: 0.4 } },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          padding: 1,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Last Budget Periods',
      },
    },
  };

  return <LineChart data={chartData} options={options} />;
}
