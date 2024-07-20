import BudgetInfo from "./BudgetInfo";

export default function BudgetPages({ params }: { params: { uid: string } }) {
  return (
    <BudgetInfo uid={params.uid} />
  );
}
