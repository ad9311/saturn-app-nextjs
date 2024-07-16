'use client';

import useBudgetStore from "@/stores/budget"

export default function ExpensesList(props: React.HTMLAttributes<HTMLDivElement>) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));

  if (budget && budget.expenses && budget.expenses.length > 0) {
    const mappedExpenses = budget.expenses.map(expense => (
      <li key={expense.id}>
        {expense.description}-{expense.amount}
      </li>
    ));

    return (
      <div {...props}>
        <section>
          <h2>Expenses List</h2>
          <ul>
            {mappedExpenses}
          </ul>
        </section>
      </div>
    );
  }

  if (budget && budget.expenses && budget.expenses.length === 0) {
    return <div>No expenses yet</div>;
  }

  return <div>Loading...</div>;
}
