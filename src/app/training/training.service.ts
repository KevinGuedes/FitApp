import { UiService } from './../shared/ui.service';
import { collection, collectionData, doc, Firestore, increment } from '@angular/fire/firestore';
import { Subscription, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.interface';
import { setDoc, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { finishedExercisesConverter, availableExercisesConverter } from './training.converters';
import { Store } from '@ngrx/store';
import * as fromRoot from './../state/app/app.reducer';
import * as fromUiActions from './../state/ui/ui.actions';
import * as fromTrainingActions from './../state/training/training.actions';
import * as fromTrainingSelectors from './../state/training/training.selectors';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private _finishedExercisesCollectionName: string = environment.firebase.finishedExercisesCollectionName;
  private _availableExercisesCollectionName: string = environment.firebase.availableExercisesCollectionName;
  private _firebaseSubscriptions: Subscription[] = [];

  constructor(
    private readonly _firestore: Firestore, 
    private readonly _uiService: UiService,
    private readonly _store: Store<fromRoot.AppState>
  ) { }

  public fetchAvailableExercises(): void {
    this._store.dispatch(fromUiActions.startLoading());
    
    this._firebaseSubscriptions.push(
      collectionData(collection(this._firestore, this._availableExercisesCollectionName).withConverter(availableExercisesConverter))
        .subscribe({
          next: (exercises: Exercise[]) => {
            // this._availableExercises = exercises;
            // this.availableExerciseChanged.next(this._availableExercises.slice()); //copy
            this._store.dispatch(fromTrainingActions.setAvailableExercises({ availableExercises: exercises }));
            this._store.dispatch(fromUiActions.stopLoading());
          },
          error: (error: any) => { 
            this.errorHandler(error);
            this._store.dispatch(fromUiActions.stopLoading());
          }
        })
    );
    //* The above subscription does not cause memory leak, it replaces itself
    //! could return the observable and use the async pipe where needed. Would also avoid havig problems with non unsubed subscription, memory leak, etc
  }

  public fetchCompletedOrCancelledExercises(): void {
    this._store.dispatch(fromUiActions.startLoading());

    this._firebaseSubscriptions.push(
      collectionData(
        collection(this._firestore, this._finishedExercisesCollectionName)
        .withConverter(finishedExercisesConverter)
      )
      .subscribe(
        {
          next: (exercises: Exercise[]) => {
            this._store.dispatch(fromTrainingActions.setFinishedExercises({ finishedExercises: exercises }));
            this._store.dispatch(fromUiActions.stopLoading());
          },
          error: (error: any) => {
            this.errorHandler(error);
            this._store.dispatch(fromUiActions.stopLoading());
          }
        }
      )
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

    this._store.dispatch(fromTrainingActions.startTraining({ exerciseId }));
  }

  public completeExercise(): void {
    this._store
    .select(fromTrainingSelectors.selectActiveTraining)
    .pipe(take(1)) //correct way of taking only 1 value at the moment in time and then close the subscription
    .subscribe((exercise: Exercise | null) => {
      this.addExerciseToDatabase({
        ...exercise!,
        date: new Date(),
        state: 'completed',
      });

      // this._activeExercise = null;
      // this.exerciseChanged.next(null);
      this._store.dispatch(fromTrainingActions.stopTraining());
    });
  }

  public cancelExercise(progress: number): void {
    this._store
    .select(fromTrainingSelectors.selectActiveTraining)
    .pipe(take(1))
    .subscribe((exercise: Exercise | null) => {
      if (exercise){
        const completenessFactor: number = (progress / 100);
        this.addExerciseToDatabase({
          ...exercise,
          duration: exercise.duration * completenessFactor,
          calories: exercise.calories * completenessFactor,
          date: new Date(),
          state: 'cancelled',
        });
      }

      this._store.dispatch(fromTrainingActions.stopTraining());
    });
  }

  public cancelSubscriptions(): void {
    this._firebaseSubscriptions.forEach(sub => sub.unsubscribe());
  }

  private addExerciseToDatabase(exercise: Exercise): void {
    setDoc(doc(collection(this._firestore, this._finishedExercisesCollectionName).withConverter(finishedExercisesConverter)), exercise);
  }

  private errorHandler(error: any): void {
    console.error(error);
    this._uiService.showSnackBar(error.message, 'Dismiss', 3);
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
