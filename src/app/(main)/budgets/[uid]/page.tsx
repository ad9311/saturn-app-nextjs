export default function BudgetPages({ params }: { params: { uid: string } }) {
  return <div>{params.uid}</div>;
}
