import { TrainingService } from './training.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'fit-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

  public ongoingTraining: boolean = false;
  private exerciseSubscription!: Subscription;

  constructor(private readonly trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.exerciseChanged.subscribe(exercise => this.ongoingTraining = Boolean(exercise));
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
