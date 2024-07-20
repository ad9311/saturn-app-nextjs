/*
  Warnings:

  - The primary key for the `budgets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `budgets` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    "user_acount_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "budgets_user_acount_id_fkey" FOREIGN KEY ("user_acount_id") REFERENCES "users" ("account_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_budgets" ("balance", "created_at", "expense_count", "id", "income_count", "month", "total_expenses", "total_income", "transaction_count", "uid", "updated_at", "user_acount_id", "year") SELECT "balance", "created_at", "expense_count", "id", "income_count", "month", "total_expenses", "total_income", "transaction_count", "uid", "updated_at", "user_acount_id", "year" FROM "budgets";
DROP TABLE "budgets";
ALTER TABLE "new_budgets" RENAME TO "budgets";
CREATE UNIQUE INDEX "budgets_uid_key" ON "budgets"("uid");
CREATE INDEX "budgets_uid_idx" ON "budgets"("uid");
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("account_id", "created_at", "email", "id", "image", "name", "updated_at") SELECT "account_id", "created_at", "email", "id", "image", "name", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_account_id_key" ON "users"("account_id");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_account_id_idx" ON "users"("account_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
