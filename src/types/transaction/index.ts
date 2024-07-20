import { Income } from "@prisma/client";

export type IncomeDb = Income;

export type IncomeTemplate = {
  amount: number;
  description: string;
}

export type CreateBudgetState = {
  budget: Income | null;
  error: {
    message: string;
  } | null;
};
