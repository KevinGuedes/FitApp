import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fit-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  @Output()
  trainingStart: EventEmitter<void>;

  constructor() {
    this.trainingStart = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  public onStartTraining(): void {
    this.trainingStart.emit();
  }
}
