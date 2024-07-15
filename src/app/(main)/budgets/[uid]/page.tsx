import InfoContainer from './InfoContainer';

export default function BudgetPage({ params }: { params: { uid: string } }) {
  return (
    <div>
      <InfoContainer uid={params.uid} />
    </div>
  );
}
