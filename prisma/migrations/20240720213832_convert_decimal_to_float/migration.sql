/*
  Warnings:

  - You are about to alter the column `balance` on the `budgets` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `total_expenses` on the `budgets` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `total_income` on the `budgets` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `amount` on the `incomes` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_budgets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "balance" REAL NOT NULL DEFAULT 0.0,
    "total_income" REAL NOT NULL DEFAULT 0.0,
    "total_expenses" REAL NOT NULL DEFAULT 0.0,
    "transaction_count" INTEGER NOT NULL DEFAULT 0,
    "income_count" INTEGER NOT NULL DEFAULT 0,
    "expense_count" INTEGER NOT NULL DEFAULT 0,
    "user_account_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "budgets_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "users" ("account_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_budgets" ("balance", "created_at", "expense_count", "id", "income_count", "month", "total_expenses", "total_income", "transaction_count", "uid", "updated_at", "user_account_id", "year") SELECT "balance", "created_at", "expense_count", "id", "income_count", "month", "total_expenses", "total_income", "transaction_count", "uid", "updated_at", "user_account_id", "year" FROM "budgets";
DROP TABLE "budgets";
ALTER TABLE "new_budgets" RENAME TO "budgets";
CREATE UNIQUE INDEX "budgets_uid_key" ON "budgets"("uid");
CREATE INDEX "budgets_uid_user_account_id_idx" ON "budgets"("uid", "user_account_id");
CREATE TABLE "new_incomes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "budget_id" INTEGER NOT NULL,
    CONSTRAINT "incomes_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_incomes" ("amount", "budget_id", "description", "id") SELECT "amount", "budget_id", "description", "id" FROM "incomes";
DROP TABLE "incomes";
ALTER TABLE "new_incomes" RENAME TO "incomes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
