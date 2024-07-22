import { createBudgetRecord } from '@/db/budget-records';
import { createUser, findUserByAccountId } from '@/db/users';
import { UserTemplate } from '@/types/user';

export type CallbackData = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  account?: {
    providerAccountId: string;
  };
};

export async function restrictUsersCallback(data: CallbackData) {
  const emailsString = process.env.AUTH_ALLOWED_EMAILS;
  const emails = (emailsString as string).split(',');
  if (emails.includes(data.user.email)) {
    return false;
  }

  return true;
}

async function createUserOnFirstSignIn(data: CallbackData) {
  const existingUser = await findUserByAccountId(data.account?.providerAccountId as string);
  if (existingUser) {
    return existingUser;
  }

  const newUser: UserTemplate = {
    name: data.user.name as string,
    email: data.user.email as string,
    accountId: Number(data.account?.providerAccountId),
    image: data.user.image as string,
  };

  const user = await createUser(newUser);
  return user;
}

export async function setupUser(data: CallbackData) {
  const user = await createUserOnFirstSignIn(data);
  if (!user) {
    return false;
  }

  const budgetRecord = await createBudgetRecord(user);
  if (!budgetRecord) {
    return false;
  }

  return true;
}
