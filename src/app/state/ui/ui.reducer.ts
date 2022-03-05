import { createReducer, on } from "@ngrx/store";
import * as UiActions from './ui.actions';

export const uiKey: string = 'ui';

export interface UiState {
    isLoading: boolean;
}

const uiInitialState: UiState = {
    isLoading: false,
}

export const uiReducer = createReducer(
    uiInitialState,
    on(UiActions.startLoading, _ => ({ isLoading: true })),
    on(UiActions.stopLoading, _ => ({ isLoading: false })),
    //use state here might not be necessary because the state is just the isLoading property
);
