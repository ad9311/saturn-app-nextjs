'use server';

import { User } from '@prisma/client';

import { auth } from '@/auth';
import { findUserByEmail } from '@/db/users';

type AuthState = {
  user: User | null;
  error: {
    message: string;
  } | null;
};

export async function checkAuth(): Promise<AuthState> {
  try {
    const session = await auth();
    if (!session || !session.user) throw new Error('user not authenticated');

    const user = await findUserByEmail(session.user.email as string);
    if (!user) throw new Error('user not found');

    return { user, error: null };
  } catch (error) {
    return { user: null, error: error as Error };
  }
}
