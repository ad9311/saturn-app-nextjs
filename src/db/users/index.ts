import { User } from '@/types/user';
import prisma from '..';

export async function createUser(user: User): Promise<User> {
  return await prisma.user.create({ data: user });
}

export async function getUserByAccountId(
  accountId: number | string
): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { accountId: Number(accountId) },
  });
}
