import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";

const selectUiState = createFeatureSelector<fromAuth.AuthState>(fromAuth.authKey);

export const selectIsAuthenticated = createSelector(selectUiState, fromAuth.selectIsAuthenticated);
