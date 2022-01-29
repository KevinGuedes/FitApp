import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../exercise.interface';
import { TrainingService } from '../training.service';

@Component({
  selector: 'fit-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart: EventEmitter<void> = new EventEmitter<void>();

  public availableExercises!: Exercise[];

  constructor(private trainingService: TrainingService) { }

  public onStartTraining(): void {
    this.trainingStart.emit();
  }

  ngOnInit(): void {
    this.availableExercises = this.trainingService.getAvailableExercises();
  }
}
