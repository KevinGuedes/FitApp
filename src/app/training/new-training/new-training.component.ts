import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fit-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  public onStartTraining(): void {
    this.trainingStart.emit();
  }

  ngOnInit(): void {
  }
}
