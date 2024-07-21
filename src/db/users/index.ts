import { User } from '@prisma/client';

import { UserTemplate } from '@/types/user';

import prisma from '..';

export async function createUser(userData: UserTemplate): Promise<User | null> {
  return await prisma.user.create({ data: userData });
}

export async function findUserByAccountId(
  accountId: number | string
): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { accountId: Number(accountId) },
  });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}
