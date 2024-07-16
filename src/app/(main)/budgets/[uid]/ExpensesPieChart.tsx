import {
  separateSummedExpensesAndColors,
  sumExpensesByCategory,
  summedExpensesToArray,
} from '@/helpers/charts';
import { Expense } from '@/types/client/transaction';
import { PieChart } from 'react-chartkick';
import 'chartkick/chart.js';

export default function ExpensesPieChart({
  expenses,
}: {
  expenses: Expense[];
}) {
  const summedExpenses = sumExpensesByCategory(expenses || []);
  const arrayOfSummedExpenses = summedExpensesToArray(summedExpenses);
  const { data, colors } = separateSummedExpensesAndColors(
    arrayOfSummedExpenses
  );

  return (
    <div>
      <PieChart data={data} colors={colors} />
    </div>
  );
}
