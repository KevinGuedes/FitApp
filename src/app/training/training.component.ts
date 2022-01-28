import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fit-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  public ongoingTraining: boolean;

  constructor() {
    this.ongoingTraining = false;
  }

  ngOnInit(): void {
  }
}
