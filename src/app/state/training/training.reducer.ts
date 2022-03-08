import { createReducer, on } from "@ngrx/store";
import { Exercise } from 'src/app/training/exercise.interface';
import * as TrainingActions from './training.actions';

export const trainingKey = 'training';

export interface TrainingSate {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise | null;
}

const trainingInitialState: TrainingSate = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null,
}

export const trainingReducer = createReducer(
    trainingInitialState,
    on(
        TrainingActions.setAvailableExercises,
        (state: TrainingSate, action) => (
            {
                ...state,
                availableExercises: action.availableExercises
            }
        )
    ),
    on(
        TrainingActions.setFinishedExercises,
        (state: TrainingSate, { finishedExercises }) => (
            {
                ...state,
                availableExercises: finishedExercises
            }
        )
    ),
    on(
        TrainingActions.startTraining,
        (state: TrainingSate, { exercisesToBeStarted }) => (
            {
                ...state,
                activeTraining: exercisesToBeStarted
            }
        )
    ),
    on(
        TrainingActions.stopTraining,
        (state: TrainingSate,) => (
            {
                ...state,
                activeTraining: null
            }
        )
    )
);

export const selectAvailableTrainings = (state: TrainingSate) => state.availableExercises;
export const selectFinishedTrainings = (state: TrainingSate) => state.finishedExercises;
export const selectActiveTraining = (state: TrainingSate) => state.activeTraining;
