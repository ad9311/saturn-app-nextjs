import Budget from "@/types/client/budget";

export default function BudgetInfo({ budget }: { budget: Budget }) {
  return (
    <section>
      <h2>{budget.month}/{budget.year}</h2>
    </section>
  );
}
