import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.interface';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../state/app/app.reducer';
import * as fromUiSelectors from '../../state/ui/ui.selectors';

@Component({
  selector: 'fit-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  public availableExercises: Exercise[] = [];
  public isLoading$!: Observable<boolean>;
  public get isDropdownAvailable(): boolean {
    return this.availableExercises.length > 0;
  }

  private _availableExercisesSubscription!: Subscription;

  constructor(
    private readonly _trainingService: TrainingService,
    private readonly _store: Store<fromRoot.AppState>
  ) { }

  public onStartTraining(newTrainingForm: NgForm): void {
    this._trainingService.startExercise(newTrainingForm.value.exercise);
  }

  public fetchAvailableExercises(): void {
    this._trainingService.fetchAvailableExercises();
  }

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromUiSelectors.selectIsLoading);
    this._availableExercisesSubscription = this._trainingService.availableExerciseChanged.subscribe((exercises: Exercise[]) => this.availableExercises = exercises);
    this.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this._availableExercisesSubscription.unsubscribe();
  }
}
