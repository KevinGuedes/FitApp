import { ActionReducerMap } from '@ngrx/store';
import * as fromUi from '../ui/ui.reducer';
import * as fromAuth from '../auth/auth.reducer';

export interface AppState {
    [fromUi.uiKey]: fromUi.UiState;
    [fromAuth.authKey]: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    [fromUi.uiKey]: fromUi.uiReducer,
    [fromAuth.authKey]: fromAuth.authReducer,
}
