type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export type UserStoreValues = {
  user: User | undefined;
}

export type UserStoreActions = {
  setUser: (user: User) => void;
  clearUser: () => void;
}

export default User;
