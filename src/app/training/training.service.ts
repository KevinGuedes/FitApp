import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  public exerciseChanged: Subject<Exercise | null> = new Subject<Exercise | null>();

  private runningExercise: Exercise | null = null;
  private exercises: Exercise[] = [];
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ]

  constructor() { }

  public getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice(); //Creates a copy of the array to avoid modifications in the original available exercises. It is another reference
  }

  public startExercise(exerciseId: string): void {
    const runningExercise = this.availableExercises.find(ex => ex.id === exerciseId);
    if (runningExercise) {
      this.runningExercise = runningExercise;
      this.exerciseChanged.next({ ...this.runningExercise });
    }
  }

  public getRunningtExercise(): Exercise | null {
    return this.runningExercise ? { ...this.runningExercise } : null;
  }

  public completeExercise(): void {
    this.exercises.push({
      ...this.runningExercise!,
      date: new Date(),
      state: 'completed'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public cancelExercise(progress: number,): void {
    if (this.runningExercise)
      this.exercises.push({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'completed'
      });

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
}
