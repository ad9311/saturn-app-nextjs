import { BudgetPeriod } from '@/types/client/budget-period';

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
