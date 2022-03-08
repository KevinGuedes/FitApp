import { Exercise } from './../../training/exercise.interface';
import { createAction, props } from '@ngrx/store';

export const setAvailableExercises = createAction(
    '[TRAINING] Set Available Exercises',
    props<{ availableExercises: Exercise[] }>()
);
export const setFinishedExercises = createAction(
    '[Training] Set Finished Exercises',
    props<{ finishedExercises: Exercise[] }>()
);

export const startTraining = createAction(
    '[Training] Start Training',
    props<{ exercisesToBeStarted: Exercise }>()
);
export const stopTraining = createAction('[Training] Stop Training');
