import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'fit-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  public progress: number = 0;
  public timer: any = 0;
  public keepDefaultMessage: boolean = true;

  constructor(private readonly _dialog: MatDialog, private readonly _trainingService: TrainingService) { }

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
    const step: number = this._trainingService.getRunningtExercise()!.duration / 100 * 1000;

    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 50) this.keepDefaultMessage = false;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this._trainingService.completeExercise();
      }
    }, step);
  }
}
