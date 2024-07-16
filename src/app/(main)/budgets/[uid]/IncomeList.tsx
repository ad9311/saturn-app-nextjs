import { Income } from '@/types/client/transaction';

export default function IncomeList({ income }: { income: Income[] }) {
  const mappedIncome = income.map(inc => (
    <li key={inc.id}>
      {inc.description}-{inc.amount}
    </li>
  ));

  return (
    <section>
      <h2>Income List</h2>
      <ul>{mappedIncome}</ul>
    </section>
  );
}
