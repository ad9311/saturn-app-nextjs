import { createUser, getUserByAccountId } from '@/db/users';
import { User } from '@/types/user';

export type CallbackData = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
};

export async function signInCallback(data: CallbackData) {
  const existingUser = await getUserByAccountId(data.user.id);

  if (existingUser) {
    return true;
  }

  const newUser: User = {
    name: data.user.name as string,
    email: data.user.email as string,
    accountId: Number(data.user.id),
    image: data.user.image as string,
  };

  const user = await createUser(newUser);

  if (user) {
    return true;
  }

  return false;
}

export async function restrictUsersCallback(data: CallbackData) {
  const emailsString = process.env.ALLOWED_EMAILS;
  const emails = (emailsString as string).split(',');
  if (emails.includes(data.user.email)) {
    return false;
  }

  return true;
}
