import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fit-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  public progress: number;
  public timer: any;

  constructor() {
    this.progress = 0;
    this.timer = 0;
  }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) clearInterval(this.timer);
    }, 1000);
  }

  public onStop(): void {
    clearInterval(this.timer);
  }
}
