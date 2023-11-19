import { createContext } from 'react';
import { Issuer } from 'src/src2/utils/auth';

export const initialState = {
  isAuthenticated: true,
  isInitialized: true,
  user: null,
};

export const AuthContext = createContext({
  ...initialState,
  issuer: Issuer.JWT,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});
