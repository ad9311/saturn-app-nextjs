import prisma from '..';
import { UserDB } from '@/types/user';

export async function createUser(user: UserDB) {
  return await prisma.user.create({ data: user });
}

export async function findUserByAccountId(accountId: number | string) {
  return await prisma.user.findUnique({
    where: { accountId: Number(accountId) },
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}
