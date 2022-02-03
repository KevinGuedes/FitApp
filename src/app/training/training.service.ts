import { collection, collectionData, Firestore, QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  public exerciseChanged: Subject<Exercise | null> = new Subject<Exercise | null>();
  public availableExerciseChanged: Subject<Exercise[]> = new Subject<Exercise[]>();

  private _runningExercise: Exercise | null = null;
  private _exercises: Exercise[] = [];
  private _availableExercises: Exercise[] = [];

  constructor(private readonly _firestore: Firestore) { }

  public fetchAvailableExercises(): void {
    const availableExercisesConverter = {
      toFirestore: (exercise: Exercise) => {
        return {
          name: exercise.name,
          duration: exercise.duration,
          calories: exercise.calories
        };
      },
      fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);

        return {
          id: snapshot.id,
          name: data['name'],
          duration: data['duration'],
          calories: data['calories'],
        };
      }
    }

    collectionData(collection(this._firestore, 'availableExercises').withConverter(availableExercisesConverter))
      .subscribe((exercises: Exercise[]) => {
        this._availableExercises = exercises;
        this.availableExerciseChanged.next(this._availableExercises.slice()); //copy
      });

    //! could return the observable and use the async pipe where needed. Would also avoid havig problems with non unsubed subscription, memory leak, etc
  }

  public getRunningtExercise(): Exercise | null {
    return this._runningExercise ? { ...this._runningExercise } : null;
  }

  public getCompletedOrCancelledExercises(): Exercise[] {
    return this._exercises.slice() //Creates a copy of the array to avoid modifications in the original available exercises. It is another reference;
  }

  public startExercise(exerciseId: string): void {
    const runningExercise = this._availableExercises.find(ex => ex.id === exerciseId);
    if (runningExercise) {
      this._runningExercise = runningExercise;
      this.exerciseChanged.next({ ...this._runningExercise });
    }
  }

  public completeExercise(): void {
    this._exercises.push({
      ...this._runningExercise!,
      date: new Date(),
      state: 'completed',
    });

    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public cancelExercise(progress: number): void {

    const completenessFactor: number = (progress / 100);

    if (this._runningExercise)
      this._exercises.push({
        ...this._runningExercise,
        duration: this._runningExercise.duration * completenessFactor,
        calories: this._runningExercise.calories * completenessFactor,
        date: new Date(),
        state: 'cancelled',
      });

    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }
}
