import { Expense } from "@/types/client/transaction";

export default function ExpensesList({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return <section>No expenses yet</section>
  }

  const mappedExpenses = expenses.map(expense => (
    <li key={expense.id}>
      {expense.description}-{expense.amount}
    </li>
  ));

  return (
    <section>
      <h2>Expenses List</h2>
      <ul>
        {mappedExpenses}
      </ul>
    </section>
  );
}
