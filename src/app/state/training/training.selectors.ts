import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromTraining from "./training.reducer";

const selectTrainingState = createFeatureSelector<fromTraining.TrainingSate>(fromTraining.trainingKey);

export const selectAvailableTrainings = createSelector(selectTrainingState, fromTraining.selectAvailableTrainings);
export const selectFinishedTrainings = createSelector(selectTrainingState, fromTraining.selectFinishedTrainings);
export const selectActiveTraining = createSelector(selectTrainingState, fromTraining.selectActiveTraining);
