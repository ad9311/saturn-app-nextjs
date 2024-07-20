'use client';

import { createBudgetAction } from "@/server-actions/budget"
import { useFormState } from "react-dom"

const initState = {
  budget: null,
  error: null,
}

export default function CreateNewBudgetForm() {
  const [_, formAction] = useFormState(createBudgetAction, initState);

  return (
    <form action={formAction}>
      <button type="submit" name="submit">Create new budget!</button>
    </form>
  )
}
