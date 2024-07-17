import { Income } from '@/types/client/transaction';

export default function IncomeList({ incomeList }: { incomeList: Income[] }) {
  const mappedIncome = incomeList.map(income => (
    <li key={income.id}>
      {income.description}-{income.amount}
    </li>
  ));

  return (
    <section>
      <h2>Income List</h2>
      <ul>{mappedIncome}</ul>
    </section>
  );
}
