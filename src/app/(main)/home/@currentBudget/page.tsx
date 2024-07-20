import Container from './Container';
import CurrenBudgetLink from './CurrenBudgetLink';

export default function CurrentBudget() {
  return (
    <article className="bg-neutral-200 h-full p-3 rounded">
      <h2>Current budget</h2>
      <CurrenBudgetLink />
      <Container />
    </article>
  );
}
