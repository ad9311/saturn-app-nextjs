import { Expense } from "@/types/client/transaction";

export default function ExpensesList({ expenses }: { expenses: Expense[] }) {
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
