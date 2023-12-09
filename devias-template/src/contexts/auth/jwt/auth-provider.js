import React, { useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AuthContext, initialState } from './auth-context';
import { Issuer } from 'src/utils/auth';
import { apiHandler } from 'src/api/bundle'; 

const STORAGE_KEY = 'token';

const ActionType = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

const handlers = {
  [ActionType.INITIALIZE]: (state, action) => ({
    ...state,
    isInitialized: true,
    issuer: Issuer.JWT,
    ...action.payload,
  }),
  [ActionType.SIGN_IN]: (state, action) => ({
    ...state,
    isAuthenticated: true,
    issuer: action.payload.issuer || Issuer.JWT,
    user: action.payload.user,
  }),
  [ActionType.SIGN_OUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    issuer: Issuer.JWT,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      try {
        const response = await apiHandler.handleGetProfile(); // Assuming this returns user data
        if (response.success) {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user: response.data.user,
            },
          });
        } else {
          localStorage.removeItem(STORAGE_KEY);
          dispatch({
            type: ActionType.INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        console.error('Error during initialization:', error);
        localStorage.removeItem(STORAGE_KEY);
        dispatch({ type: ActionType.INITIALIZE, payload: { isAuthenticated: false, user: null } });
      }
    } else {
      dispatch({ type: ActionType.INITIALIZE, payload: { isAuthenticated: false, user: null } });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const signIn = useCallback(async (email, password) => {
    try {
      const response = await apiHandler.handleLogin(email, password);
      if (response.success && response.data?.token?.token) {
        localStorage.setItem(STORAGE_KEY, response.data.token.token);
        dispatch({
          type: ActionType.SIGN_IN,
          payload: { user: response.data.user },
        });
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: ActionType.SIGN_OUT });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
