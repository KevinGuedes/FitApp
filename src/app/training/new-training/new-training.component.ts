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
  }

  ngOnDestroy(): void {
    this._availableExercisesSubscription.unsubscribe();
  }

}
