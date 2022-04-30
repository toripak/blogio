// firestoreReducer action type

enum ActionKind {
  NewDocument = 'NEW_DOCUMENT',
  Error = 'ERROR',
  DeletedDocument = 'DELETED_DOCUMENT',
  IsLoading = 'IS_LOADING'
}

export type Action = {
  type: ActionKind,
  payload: {
    [key: string]: unknown
  }
}

// AuthContext User type
export type User = {
  [key: string]: any
} | null;

// AuthContext action type
export type AuthAction =
  | { type: 'AUTHENTICATED'; payload: User }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT'; payload: null }









