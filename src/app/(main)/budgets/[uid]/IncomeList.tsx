'use client';

import useBudgetStore from "@/stores/budget"

export default function IncomeList(props: React.HTMLAttributes<HTMLDivElement>) {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));

  if (budget && budget.income && budget.income.length > 0) {
    const mappedIncome = budget.income.map(income => (
      <li key={income.id}>
        {income.description}-{income.amount}
      </li>
    ));

    return (
      <div {...props}>
        <section>
          <h2>Income List</h2>
          <ul>
            {mappedIncome}
          </ul>
        </section>
      </div>
    );
  }

  if (budget && budget.income && budget.income.length === 0) {
    return <div>No income yet</div>;
  }

  return <div>Loading...</div>;
}
