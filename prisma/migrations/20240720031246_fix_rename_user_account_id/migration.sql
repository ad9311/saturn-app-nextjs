/*
  Warnings:

  - You are about to drop the column `user_acount_id` on the `budgets` table. All the data in the column will be lost.
  - Added the required column `user_account_id` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_budgets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "balance" DECIMAL NOT NULL DEFAULT 0.0,
    "total_income" DECIMAL NOT NULL DEFAULT 0.0,
    "total_expenses" DECIMAL NOT NULL DEFAULT 0.0,
    "transaction_count" INTEGER NOT NULL DEFAULT 0,
    "income_count" INTEGER NOT NULL DEFAULT 0,
    "expense_count" INTEGER NOT NULL DEFAULT 0,
    "user_account_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "budgets_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "users" ("account_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_budgets" ("balance", "created_at", "expense_count", "id", "income_count", "month", "total_expenses", "total_income", "transaction_count", "uid", "updated_at", "year") SELECT "balance", "created_at", "expense_count", "id", "income_count", "month", "total_expenses", "total_income", "transaction_count", "uid", "updated_at", "year" FROM "budgets";
DROP TABLE "budgets";
ALTER TABLE "new_budgets" RENAME TO "budgets";
CREATE UNIQUE INDEX "budgets_uid_key" ON "budgets"("uid");
CREATE INDEX "budgets_uid_idx" ON "budgets"("uid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
