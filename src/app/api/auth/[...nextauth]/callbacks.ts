import { createUser, getUserByAccountId } from '@/db/users';
import { User } from '@/types/user';

export async function signInCallback(data: any) {
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
