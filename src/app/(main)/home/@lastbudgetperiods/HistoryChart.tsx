import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';
import BudgetPeriod from '@/types/client/budget-period';
import {
  balanceChartData,
  expensesChartData,
  incomeChartData,
} from '@/helpers/charts';

export default function HistoryChart({
  budgetPeriods,
}: {
  budgetPeriods: BudgetPeriod[];
}) {
  const reverseData = budgetPeriods.toReversed();

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
