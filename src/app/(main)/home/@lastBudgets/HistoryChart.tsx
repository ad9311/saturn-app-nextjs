import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';
import Budget from '@/types/client/budget';
import {
  balanceChartData,
  expensesChartData,
  incomeChartData,
} from '@/helpers/charts';

export default function HistoryChart({ budgets }: { budgets: Budget[] }) {
  const reverseData = budgets.toReversed();

  const data = [
    { name: 'Balance', data: balanceChartData(reverseData) },
    { name: 'Income', data: incomeChartData(reverseData) },
    { name: 'Expenses', data: expensesChartData(reverseData) },
  ];

  return (
    <div>
      <LineChart data={data} legend="left" />
    </div>
  );
}
