import { User } from '@prisma/client';

export type UserTemplate = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
