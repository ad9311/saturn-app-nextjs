'use client';

import useBudgetStore from '@/stores/budget';
import Link from 'next/link';

export default function CurrenBudgetLink() {
  const { budget } = useBudgetStore(state => ({ budget: state.budget }));

  if (!budget) return null;

  return <Link href={`/budgets/${budget.uid}`}>Budget</Link>;
}
