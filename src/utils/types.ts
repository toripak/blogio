// firestoreReducer action type

import { DocumentReference, OrderByDirection, WhereFilterOp } from "firebase/firestore";

export type Action =
  | { type: 'NEW_DOCUMENT'; payload: DocumentReference }
  | { type: 'ERROR'; payload: string | null }
  | { type: 'DELETED_DOCUMENT'; payload?: string | null }
  | { type: 'IS_LOADING'; payload?: string | null }

// AuthContext User type
export type User = {
  [key: string]: any
} | null;

// AuthContext action type
export type AuthAction =
  | { type: 'AUTHENTICATED'; payload: User }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT'; payload: null }

// useCollection hook types
export type q = [string, WhereFilterOp, string];
export type _orderBy = [string, OrderByDirection | undefined];










