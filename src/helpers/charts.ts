import { BudgetPeriod } from '@/types/client/budget-period';
import { ExpenseTransaction } from '@/types/client/transaction';

type SummedExpenses = {
  [categoryName: string]: {
    amount: number;
    color: string;
  };
};

type ArrayOfSummedExpense = [string, number, string];

export function balanceChartData(budgetPeriods: BudgetPeriod[]) {
  const datasetData = budgetPeriods.map(bg => [
    `${bg.month}/${bg.year}`,
    bg.balance,
  ]);

  return datasetData;
}

export function incomeChartData(budgetPeriods: BudgetPeriod[]) {
  const datasetData = budgetPeriods.map(bg => [
    `${bg.month}/${bg.year}`,
    bg.totalIncome,
  ]);

  return datasetData;
}

export function expensesChartData(budgetPeriods: BudgetPeriod[]) {
  const datasetData = budgetPeriods.map(bg => [
    `${bg.month}/${bg.year}`,
    bg.totalExpenses,
  ]);

  return datasetData;
}

export function sumExpensesByCategory(
  expenses: ExpenseTransaction[]
): SummedExpenses {
  return expenses.reduce((obj: SummedExpenses, expense: ExpenseTransaction) => {
    const categoryName = expense.category.name;
    const categoryColor = expense.category.color;

    if (!obj[categoryName]) {
      obj[categoryName] = {
        amount: 0,
        color: '#ffffff',
      };
    }

    obj[categoryName].amount += expense.amount;
    obj[categoryName].color = categoryColor;

    return obj;
  }, {});
}

export function summedExpensesToArray(
  summedExpenses: SummedExpenses
): ArrayOfSummedExpense[] {
  const formedArray = Object.keys(summedExpenses).map(
    (key): ArrayOfSummedExpense => [
      key,
      summedExpenses[key].amount,
      summedExpenses[key].color,
    ]
  );

  const sortedArray = formedArray.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    }

    if (a[1] < b[1]) {
      return 1;
    }

    return 0;
  });

  return sortedArray;
}

export function separateSummedExpensesAndColors(
  summedExpenses: ArrayOfSummedExpense[]
) {
  const data: [string, number][] = [];
  const colors: string[] = [];

  summedExpenses.forEach(summedExpense => {
    data.push([summedExpense[0], summedExpense[1]]);
    colors.push(summedExpense[2]);
  });

  return { data, colors };
}
