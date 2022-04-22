import React from 'react';
import { Role } from '../model/enums/role.enum';

export interface User {
  //accessToken: string;
  loggedIn: boolean;
  id: string;
  username: string;
  role: Role;
}

export const unsignedUser: User = {
  //accessToken: '',
  loggedIn: false,
  id: '',
  username: '',
  role: Role.UNDEFINED,
};

const AuthContext = React.createContext({
  user: unsignedUser,
  updateAuthContext: (user: User) => {},
});

export default AuthContext;
