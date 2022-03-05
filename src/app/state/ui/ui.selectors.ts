import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUi from "./ui.reducer";

const selectUiState = createFeatureSelector<fromUi.UiState>(fromUi.uiKey);
//selects the ui slice from the global app state

export const selectIsLoading = createSelector(
    selectUiState,
    (state: fromUi.UiState) => state.isLoading
);
