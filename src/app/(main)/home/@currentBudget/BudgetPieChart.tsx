import { PieChart } from 'react-chartkick';
import 'chartkick/chart.js';
import Budget from '@/types/client/budget';
import {
  separateSummedExpensesAndColors,
  sumExpensesByCategory,
  summedExpensesToArray,
} from '@/helpers/charts';

export default function BudgetPieChart({
  budget,
}: {
  budget: Budget;
}) {
  const expenses = budget.expenses;
  const summedExpenses = sumExpensesByCategory(expenses || []);
  const arrayOfSummedExpenses = summedExpensesToArray(summedExpenses);
  const { data, colors } = separateSummedExpensesAndColors(
    arrayOfSummedExpenses
  );

  return (
    <div>
      <h3 className="text-center">
        {budget.month}-{budget.year}
      </h3>
      <div className="xl:max-w-[30rem]">
        <PieChart data={data} colors={colors} />
      </div>
    </div>
  );
}
