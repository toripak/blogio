import { User } from "./types";

export interface InitialStateType {
  document: { [key: string]: any } | null;
  isLoading: Boolean;
  error: string | null;
  success: Boolean | null;
};

export interface DefaultUserState {
  authenticated: Boolean;
  user: User | null,
}
