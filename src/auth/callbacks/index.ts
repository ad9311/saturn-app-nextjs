import { createUser, findUserByAccountId } from '@/db/users';
import { UserDB } from '@/types/user';

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

export async function signInCallback(data: CallbackData) {
  const existingUser = await findUserByAccountId(
    data.account?.providerAccountId as string
  );

  if (existingUser) {
    return true;
  }

  const newUser: UserDB = {
    name: data.user.name as string,
    email: data.user.email as string,
    accountId: Number(data.account?.providerAccountId),
    image: data.user.image as string,
  };

  const user = await createUser(newUser);

  if (user) {
    return true;
  }

  return false;
}

export async function restrictUsersCallback(data: CallbackData) {
  const emailsString = process.env.AUTH_ALLOWED_EMAILS;
  const emails = (emailsString as string).split(',');
  if (emails.includes(data.user.email)) {
    return false;
  }

  return true;
}
