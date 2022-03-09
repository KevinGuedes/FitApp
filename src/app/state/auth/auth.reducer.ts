import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";

export const authKey = 'auth';

export interface AuthState {
    isAuthenticated: boolean;
}

const authInitialState: AuthState = {
    isAuthenticated: false,
}

export const authReducer = createReducer(
    authInitialState,
    on(AuthActions.setAuthtenticated, _ => ({ isAuthenticated: true })),
    on(AuthActions.setUnauthenticated, _ => ({ isAuthenticated: false })),
);

export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
