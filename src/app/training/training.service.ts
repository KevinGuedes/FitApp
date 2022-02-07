import { collection, collectionData, doc, Firestore, increment } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.interface';
import { setDoc, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { finishedExercisesConverter, availableExercisesConverter } from './training.converters';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  public exerciseChanged: Subject<Exercise | null> = new Subject<Exercise | null>();
  public availableExerciseChanged: Subject<Exercise[]> = new Subject<Exercise[]>();
  public finishedExercisesChanged: Subject<Exercise[]> = new Subject<Exercise[]>();

  private _runningExercise: Exercise | null = null;
  private _finishedExercises: Exercise[] = [];
  private _availableExercises: Exercise[] = [];
  private _finishedExercisesCollectionName: string = environment.firebase.finishedExercisesCollectionName;
  private _availableExercisesCollectionName: string = environment.firebase.availableExercisesCollectionName;
  private _firebaseSubscriptions: Subscription[] = [];

  constructor(private readonly _firestore: Firestore) { }

  public fetchAvailableExercises(): void {
    this._firebaseSubscriptions.push(
      collectionData(collection(this._firestore, this._availableExercisesCollectionName).withConverter(availableExercisesConverter))
        .subscribe({
          next: (exercises: Exercise[]) => {
            this._availableExercises = exercises;
            this.availableExerciseChanged.next(this._availableExercises.slice()); //copy
          },
          error: (error: any) => this.errorHandler(error)
        })
    );
    //* The above subscription does not cause memory leak, it replaces itself
    //! could return the observable and use the async pipe where needed. Would also avoid havig problems with non unsubed subscription, memory leak, etc
  }

  public getRunningtExercise(): Exercise | null {
    return this._runningExercise ? { ...this._runningExercise } : null;
  }

  public fetchCompletedOrCancelledExercises(): void {
    this._firebaseSubscriptions.push(
      collectionData(collection(this._firestore, this._finishedExercisesCollectionName).withConverter(finishedExercisesConverter))
        .subscribe({
          next: (exercises: Exercise[]) => {
            this._finishedExercises = exercises;
            this.finishedExercisesChanged.next(this._finishedExercises.slice());
          },
          error: (error: any) => this.errorHandler(error)
        })
    );
    //! When the user log out, the communication with firestore will throw an error because there is no token to send on the request
    //! Thats why the subscriptions need to be unsubed
    //! Basically, when the user log out, the subscriptions well be running
  }

  public startExercise(exerciseId: string): void {
    const exerciseRef = doc(this._firestore, this._availableExercisesCollectionName, exerciseId);
    updateDoc(exerciseRef, {
      lastSelected: new Date().toUTCString(),
      selectCount: increment(1),
    });

    const runningExercise = this._availableExercises.find(ex => ex.id === exerciseId);
    if (runningExercise) {
      this._runningExercise = runningExercise;
      this.exerciseChanged.next({ ...this._runningExercise });
    }
  }

  public completeExercise(): void {
    this.addExerciseToDatabase({
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
      this.addExerciseToDatabase({
        ...this._runningExercise,
        duration: this._runningExercise.duration * completenessFactor,
        calories: this._runningExercise.calories * completenessFactor,
        date: new Date(),
        state: 'cancelled',
      });

    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public cancelSubscriptions(): void {
    this._firebaseSubscriptions.forEach(sub => sub.unsubscribe());
  }

  private addExerciseToDatabase(exercise: Exercise): void {
    setDoc(doc(collection(this._firestore, this._finishedExercisesCollectionName).withConverter(finishedExercisesConverter)), exercise);
  }

  private errorHandler(error: any): void {
    console.error(error);
  }
}

//#region Study Firebase
// const querySnapshot = getDocs(data).then(result => {
    //   result.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // });

    // const unsubscribe = onSnapshot(data, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     console.log(change.doc.id, change.doc.data());
    //   }
    //   )
    // });

    // const unsub = onSnapshot(collection(this.firestore, "availableExercises"), (doc) => {
    //   doc.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data(), doc.metadata.hasPendingWrites);
    //   })

    //   doc.docChanges().forEach((change) => {
    //     console.log(change)
    //   })
    // })

    // unsub();
    
    // let x: Observable<Exercise[]> = collectionData(collection(this._firestore, this._availableExercisesCollectionName), {
    //   idField: 'id'
    // }) as Observable<Exercise[]>
    // console.log(x);
//#endregion
