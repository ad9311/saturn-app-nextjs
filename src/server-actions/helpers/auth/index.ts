'use server';

import { auth } from '@/auth';
import { findUserByEmail } from '@/db/users';
import { User } from '@prisma/client';

type AuthState = {
  user: User | null;
  error: {
    message: string;
  } | null;
};

export async function checkAuth(): Promise<AuthState> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      user: null,
      error: {
        message: 'user not authenticated',
      },
    };
  }

  const user = await findUserByEmail(session.user.email as string);

  if (!user) {
    return {
      user: null,
      error: {
        message: 'user not found',
      },
    };
  }

  return { user, error: null };
}
