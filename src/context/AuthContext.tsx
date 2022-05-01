import React, { createContext, useReducer, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

import { DefaultUserState } from '../utils/interfaces';
import { AuthAction, User } from '../utils/types';

const initialState = {
  user: null,
  authenticated: false,
}

export const AuthContext = createContext<User>(null);

export const authReducer = (state: DefaultUserState, action: AuthAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      return { ...state, user: payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTHENTICATED':
      return { ...state, user: payload, authenticated: true };
    default:
      console.log(`Unknown action type: ${type}`);
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTHENTICATED', payload: user });
      unsub();
    })
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}