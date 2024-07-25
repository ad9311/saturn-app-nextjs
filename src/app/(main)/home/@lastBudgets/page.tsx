import Image from "next/image";
import Link from "next/link";
import OpenArrow from '@/assets/img/open-arrow.svg';

export default function LastBudgets() {
  return (
    <article className="card h-full p-3 rounded">
      <div className="flex items-center gap-3">
        <h2 className="title">Budget history</h2>
        <Link href="/budgets">
          <Image src={OpenArrow} alt="go-to-current-budget" className="w-6" />
        </Link>
      </div>
    </article>
  );
}
