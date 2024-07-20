/*
  Warnings:

  - A unique constraint covering the columns `[user_account_id]` on the table `budgets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "budgets_user_account_id_key" ON "budgets"("user_account_id");
