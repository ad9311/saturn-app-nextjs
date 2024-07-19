import { createBudget, findCurrentBudget } from "@/db/budgets";
import { findUserByEmail } from "@/db/users";
import { getServerSession } from "next-auth";

export default async function CurrentBudget() {
  // const session = await getServerSession();
  // const user = await findUserByEmail(session?.user?.email as string);
  // const currentBudget = await findCurrentBudget(Number(user?.accountId));

  // console.log(currentBudget);

  // if (currentBudget === null) {
  //   const now = new Date();
  //   const currentMonth = now.getMonth() + 1;
  //   const currentYear = now.getFullYear();
  //   await createBudget(Number(user?.accountId), { month: currentMonth, year: currentYear });
  // }

  // if (currentBudget) {
  //   return (
  //     <article className="bg-neutral-200 h-full p-3 rounded">
  //       <h2>Current budget</h2>
  //       {currentBudget.id}
  //     </article>
  //   );
  // }

  return <p>loading...</p>
}
