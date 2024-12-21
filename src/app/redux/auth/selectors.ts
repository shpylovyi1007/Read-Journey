import { RootState } from "../store";
import { User } from "./slice";

export const selectIsLoggedIn = (state: RootState): User[] =>
  state.auth.isLoggedIn;

export const selectUser = (state: RootState) => state.auth.user;
