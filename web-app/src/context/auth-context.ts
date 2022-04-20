import React from 'react';
import { Role } from '../model/enums/role.enum';

export interface User {
  //accessToken: string;
  loggedIn: boolean;
  id: number;
  username: string;
  role: Role;
}

export const unsignedUser: User = {
  //accessToken: '',
  loggedIn: false,
  id: -1,
  username: '',
  role: Role.UNDEFINED,
};

const AuthContext = React.createContext({
  user: unsignedUser,
  updateAuthContext: (user: User) => {},
});

export default AuthContext;
