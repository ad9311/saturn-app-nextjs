import { User } from '@prisma/client';

export type UserTemplate = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type UserStoreValues = {
  user: User | null;
};

export type UserStoreActions = {
  setUser: (user: User) => void;
  clearUser: () => void;
};
