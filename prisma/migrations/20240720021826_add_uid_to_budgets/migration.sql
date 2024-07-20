/*
  Warnings:

  - Added the required column `uid` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_budgets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uid" BIGINT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "balance" DECIMAL NOT NULL DEFAULT 0.0,
    "total_income" DECIMAL NOT NULL DEFAULT 0.0,
    "total_expenses" DECIMAL NOT NULL DEFAULT 0.0,
    "transaction_count" INTEGER NOT NULL DEFAULT 0,
    "income_count" INTEGER NOT NULL DEFAULT 0,
    "expense_count" INTEGER NOT NULL DEFAULT 0,
    "user_acount_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "budgets_user_acount_id_fkey" FOREIGN KEY ("user_acount_id") REFERENCES "users" ("account_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_budgets" ("balance", "created_at", "expense_count", "id", "income_count", "month", "total_expenses", "total_income", "transaction_count", "updated_at", "user_acount_id", "year") SELECT "balance", "created_at", "expense_count", "id", "income_count", "month", "total_expenses", "total_income", "transaction_count", "updated_at", "user_acount_id", "year" FROM "budgets";
DROP TABLE "budgets";
ALTER TABLE "new_budgets" RENAME TO "budgets";
CREATE UNIQUE INDEX "budgets_uid_key" ON "budgets"("uid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
