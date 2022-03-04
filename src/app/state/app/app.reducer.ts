import { Action, createReducer, on } from '@ngrx/store';

export interface AppState {
    isLoading: boolean;
}

export const appInitialState: AppState = {
    isLoading: false,
}

export const appReducer = createReducer(
    appInitialState,
);
