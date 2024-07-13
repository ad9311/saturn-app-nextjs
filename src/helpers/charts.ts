import { BudgetPeriod } from '@/types/client/budget-period';

export function chartDateLables(budgetPeriods: BudgetPeriod[]) {
  const labels = budgetPeriods.map(bg => `${bg.month}-${bg.year}`);

  return labels;
}

export function balanceChartData(budgetPeriods: BudgetPeriod[]) {
  const datasetData = budgetPeriods.map(bg => bg.balance);

  return datasetData;
}

export function incomeChartData(budgetPeriods: BudgetPeriod[]) {
  const datasetData = budgetPeriods.map(bg => bg.totalIncome);

  return datasetData;
}

export function expensesChartData(budgetPeriods: BudgetPeriod[]) {
  const datasetData = budgetPeriods.map(bg => bg.totalExpenses);

  return datasetData;
}
