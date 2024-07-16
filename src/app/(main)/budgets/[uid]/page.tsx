import ExpensesList from './ExpensesList';
import IncomeList from './IncomeList';
import InfoContainer from './InfoContainer';

export default function BudgetPage({ params }: { params: { uid: string } }) {
  return (
    <div className="grid grid-flow-row gap-3">
      <div className="grid grid-flow-row gap-3 lg:grid-cols-12 lg:grid-flow-col">
        <InfoContainer uid={params.uid} className="p-3 bg-neutral-200 rounded-sm lg:col-span-5" />
        <IncomeList className="p-3 bg-neutral-200 rounded-sm lg:col-span-7" />
      </div>
      <div className="grid grid-flow-row gap-3 lg:grid-cols-12 lg:grid-flow-col">
        <ExpensesList className="p-3 bg-neutral-200 rounded-sm lg:col-span-8" />
      </div>
    </div>
  );
}
