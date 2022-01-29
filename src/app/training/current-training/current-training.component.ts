import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'fit-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit: EventEmitter<void> = new EventEmitter<void>();
  public progress: number = 0;
  public timer: any = 0;

  constructor(private dialog: MatDialog) { }

  public onStop(): void {
    clearInterval(this.timer);

    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.trainingExit.emit();
      else this.startOrResumeTimer();
    })
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  private startOrResumeTimer(): void {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) clearInterval(this.timer);
    }, 1000);
  }
}
