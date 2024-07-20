import { BudgetDb } from "@/types/budget"

type BudgetContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  budget: BudgetDb
}

export default function IncomeContainer({ budget, ...props }: BudgetContainerProps) {
  return (
    <div {...props}>IncomeContainer</div>
  )
}
