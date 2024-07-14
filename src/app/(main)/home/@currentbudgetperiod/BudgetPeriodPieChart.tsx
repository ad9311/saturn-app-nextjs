import { PieChart } from 'react-chartkick';
import 'chartkick/chart.js';
import BudgetPeriod from '@/types/client/budget-period';
import {
  separateSummedExpensesAndColors,
  sumExpensesByCategory,
  summedExpensesToArray,
} from '@/helpers/charts';

export default function BudgetPeriodPieChart({
  budgetPeriod,
}: {
  budgetPeriod: BudgetPeriod;
}) {
  const expenses = budgetPeriod.expenses;
  const summedExpenses = sumExpensesByCategory(expenses || []);
  const arrayOfSummedExpenses = summedExpensesToArray(summedExpenses);
  const { data, colors } = separateSummedExpensesAndColors(
    arrayOfSummedExpenses
  );

  console.log(data);

  return (
    <div>
      <h3 className="text-center">
        {budgetPeriod.month}-{budgetPeriod.year}
      </h3>
      <div className="xl:max-w-[30rem]">
        <PieChart data={data} colors={colors} />
      </div>
    </div>
  );
}
