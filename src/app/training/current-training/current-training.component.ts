import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../state/app/app.reducer';
import * as fromTrainingSelectors from './../../state/training/training.selectors';
import { Exercise } from '../exercise.interface';
import { take } from 'rxjs';

@Component({
  selector: 'fit-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  public progress: number = 0;
  public timer: any = 0;
  public keepDefaultMessage: boolean = true;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _trainingService: TrainingService,
    private readonly _store: Store<fromRoot.AppState>
  ) { }

  public onStop(): void {
    clearInterval(this.timer);

    const dialogRef = this._dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) this._trainingService.cancelExercise(this.progress);
      else {
        this.startOrResumeTimer();
        this.keepDefaultMessage = false;
      }
    })
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  private startOrResumeTimer(): void {
    this._store
      .select(fromTrainingSelectors.selectActiveTraining)
      .pipe(take(1))
      .subscribe((exercise: Exercise | null) => {
        const step: number = exercise!.duration / 100 * 1000;

        this.timer = setInterval(() => {
          this.progress += 1;
          if (this.progress >= 50) this.keepDefaultMessage = false;
          if (this.progress >= 100) {
            clearInterval(this.timer);
            this._trainingService.completeExercise();
          }
        }, step);
      })
  }
}
