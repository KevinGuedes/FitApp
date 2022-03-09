import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.interface';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../state/app/app.reducer';
import * as fromUiSelectors from '../../state/ui/ui.selectors';
import * as fromTrainingSelectors from '../../state/training/training.selectors';

@Component({
  selector: 'fit-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  public availableExercises$!: Observable<Exercise[]>;
  public isLoading$!: Observable<boolean>;

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
    this.availableExercises$ = this._store.select(fromTrainingSelectors.selectAvailableTrainings);
    this.fetchAvailableExercises();
  }
}
