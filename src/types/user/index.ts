import { User } from '@prisma/client';

export type UserTemplate = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};
