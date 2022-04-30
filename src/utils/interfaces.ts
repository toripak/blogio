import { User } from "./types";

export interface InitialStateType {
  document: any;
  isLoading: Boolean;
  error: Error | null;
  success: Boolean;
};

export interface DefaultUserState {
  authenticated: Boolean;
  user: User | null,
}
