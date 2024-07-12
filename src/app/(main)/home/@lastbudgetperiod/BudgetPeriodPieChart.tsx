import { BudgetPeriod } from "@/types/client/budget-period";

export default function BudgetPeriodPieChart({ budgetPeriod }: { budgetPeriod: BudgetPeriod }) {
  return (
    <div>{budgetPeriod.month}-{budgetPeriod.year}</div>
  )
}
