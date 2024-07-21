import { BudgetDb } from '@/types/budget';

import DeleteIncomeButton from './DeleteIncomeButton';
import NewIncomeButton from './NewIncomeButton';
import UpdateIncomeButton from './UpdateIncomeButton';

type IncomeContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  budget: BudgetDb;
};

export default function IncomeList({ budget, ...props }: IncomeContainerProps) {
  const mappedIncomeList = budget.incomeList.map(income => (
    <li key={income.id} className="flex items-center justify-between">
      <p>
        {income.description}-{income.amount.toFixed(2)}
      </p>
      <div>
        <UpdateIncomeButton income={income} />
        <DeleteIncomeButton income={income} />
      </div>
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
