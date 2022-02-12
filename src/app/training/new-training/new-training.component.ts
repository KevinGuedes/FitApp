import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.interface';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'fit-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  public availableExercises: Exercise[] = [];
  public isLoading: boolean = true;
  public get isDropdownAvailable(): boolean {
    return this.availableExercises.length > 0;
  }

  private _availableExercisesSubscription!: Subscription;
  private _loadingSubscription!: Subscription;

  constructor(private readonly _trainingService: TrainingService, private readonly _uiService: UiService) { }

  public onStartTraining(newTrainingForm: NgForm): void {
    this._trainingService.startExercise(newTrainingForm.value.exercise);
  }

  public fetchAvailableExercises(): void {
    this._trainingService.fetchAvailableExercises();
  }

  ngOnInit(): void {
    this._loadingSubscription = this._uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    this._availableExercisesSubscription = this._trainingService.availableExerciseChanged.subscribe((exercises: Exercise[]) => this.availableExercises = exercises);
    this.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this._availableExercisesSubscription.unsubscribe();
    this._loadingSubscription.unsubscribe();
  }

}
