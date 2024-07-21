/*
  Warnings:

  - You are about to drop the column `user_account_id` on the `budgets` table. All the data in the column will be lost.
  - Added the required column `budget_record_id` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "budget_records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "budget_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "budget_record_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "budgets_budget_record_id_fkey" FOREIGN KEY ("budget_record_id") REFERENCES "budget_records" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_budgets" ("balance", "created_at", "expense_count", "id", "income_count", "month", "total_expenses", "total_income", "transaction_count", "uid", "updated_at", "year") SELECT "balance", "created_at", "expense_count", "id", "income_count", "month", "total_expenses", "total_income", "transaction_count", "uid", "updated_at", "year" FROM "budgets";
DROP TABLE "budgets";
ALTER TABLE "new_budgets" RENAME TO "budgets";
CREATE UNIQUE INDEX "budgets_uid_key" ON "budgets"("uid");
CREATE INDEX "budgets_uid_budget_record_id_idx" ON "budgets"("uid", "budget_record_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "budget_records_user_id_key" ON "budget_records"("user_id");
