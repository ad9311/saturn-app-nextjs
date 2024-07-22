import { BudgetDb } from '@/types/budget';

import DeleteExpenseButton from './DeleteExpenseButton';
import NewExpenseButton from './NewExpenseButton';
import UpdateExpenseButton from './UpdateExpenseButton';

type ExpenseContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  budget: BudgetDb;
};

export default function ExpenseList({ budget, ...props }: ExpenseContainerProps) {
  const mappedExpenses = budget.expenses.map(expense => (
    <li key={expense.id} className="flex items-center justify-between">
      <p>
        {expense.description}-{expense.amount.toFixed(2)}
      </p>
      <div>
        <UpdateExpenseButton expense={expense} />
        <DeleteExpenseButton expense={expense} />
      </div>
    </li>
  ));

  return (
    <div {...props}>
      <section>
        <div className="flex items-center gap-3">
          <h2>Expenses</h2>
          <NewExpenseButton />
        </div>
        <ul>{mappedExpenses}</ul>
      </section>
    </div>
  );
}
