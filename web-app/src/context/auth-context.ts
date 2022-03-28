import React from 'react';

export interface User {
  accessToken: string;
  loggedIn: boolean;
  id: number;
  username: string;
}

export const unsignedUser: User = {
  accessToken: '',
  loggedIn: false,
  id: -1,
  username: '',
};

const AuthContext = React.createContext({
  user: unsignedUser,
  updateAuthContext: (user: User) => {},
});

export default AuthContext;
