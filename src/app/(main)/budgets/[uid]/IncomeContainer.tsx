import { BudgetDb } from '@/types/budget';
import NewIncomeButton from './NewIncomeButton';
import UpdateIncomeButton from './UpdateIncomeButton';

type BudgetContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  budget: BudgetDb;
};

export default function IncomeContainer({
  budget,
  ...props
}: BudgetContainerProps) {
  const mappedIncomeList = budget.incomeList.map(income => (
    <li key={income.id} className="flex items-center justify-between">
      <p>
        {income.description}-{income.amount.toFixed(2)}
      </p>
      <UpdateIncomeButton income={income} />
    </li>
  ));

  return (
    <div {...props}>
      <section>
        <div className="flex items-center gap-3">
          <h2>Income List</h2>
          <NewIncomeButton />
        </div>
        <ul>{mappedIncomeList}</ul>
      </section>
    </div>
  );
}
