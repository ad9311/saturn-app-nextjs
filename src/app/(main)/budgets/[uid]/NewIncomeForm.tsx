import { createIncome } from "@/server-actions/transaction";
import { ResponseCreateIncome } from "@/types/client/transaction";
import { useFormState } from "react-dom";
import Cookie from 'js-cookie';

const initialState: ResponseCreateIncome= {
  income: undefined
};

export default function NewIncomeForm({ budgetUid }: { budgetUid: number }) {
  const [formState, formAction] = useFormState(createIncome, initialState);
  const authToken = Cookie.get('SATURN_APP_AUTH');

  return (
    <form action={formAction}>
      <input type="hidden" name="budget[uid]" value={budgetUid} readOnly />
      <input type="hidden" name="auth_token" value={authToken} readOnly />
      <label htmlFor="description">
        <textarea name="income[description]" id="description" placeholder="Description"></textarea>
      </label>
      <label htmlFor="amount">
        <input
          type="number"
          name="income[amount]"
          id="amount"
          placeholder="Amount"
        />
      </label>
      <button type="submit" name="submit">
        Submit
      </button>
    </form>
  )
}
