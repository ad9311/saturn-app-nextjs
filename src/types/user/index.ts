import { User as UserDB } from '@prisma/client';

export type User =  Omit<UserDB, 'id' | 'createdAt' | 'updatedAt'>;
