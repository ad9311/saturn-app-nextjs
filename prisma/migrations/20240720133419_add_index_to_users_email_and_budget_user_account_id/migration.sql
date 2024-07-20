-- DropIndex
DROP INDEX "budgets_uid_idx";

-- DropIndex
DROP INDEX "users_account_id_idx";

-- CreateIndex
CREATE INDEX "budgets_uid_user_account_id_idx" ON "budgets"("uid", "user_account_id");

-- CreateIndex
CREATE INDEX "users_account_id_email_idx" ON "users"("account_id", "email");
