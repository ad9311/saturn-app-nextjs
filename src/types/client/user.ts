type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserStoreValues = {
  user: User | undefined;
};

export type UserStoreActions = {
  setUser: (user: User) => void;
  clearUser: () => void;
};

export type ResponseCreateSessionData = {
  authToken: string | null;
  user: User | undefined;
};

export type ResponseDeleteSessionData = {
  signedOutSuccessfully: boolean;
};


export default User;
