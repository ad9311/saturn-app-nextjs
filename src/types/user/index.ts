import { User } from '@prisma/client';

export type UserDB = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
