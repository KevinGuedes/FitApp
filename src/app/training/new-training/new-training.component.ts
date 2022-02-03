import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.interface';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fit-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  public availableExercises: Exercise[] = [];
  private _availableExercisesSubscription!: Subscription;

  constructor(private readonly _trainingService: TrainingService) { }

  public onStartTraining(newTrainingForm: NgForm): void {
    this._trainingService.startExercise(newTrainingForm.value.exercise);
  }

  ngOnInit(): void {
    this._trainingService.fetchAvailableExercises();
    this._availableExercisesSubscription = this._trainingService.availableExerciseChanged.subscribe((exercises: Exercise[]) => this.availableExercises = exercises);

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
  }

  ngOnDestroy(): void {
    this._availableExercisesSubscription.unsubscribe();
  }

}
