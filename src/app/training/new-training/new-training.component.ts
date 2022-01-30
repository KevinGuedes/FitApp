import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../exercise.interface';
import { TrainingService } from '../training.service';

@Component({
  selector: 'fit-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  public availableExercises!: Exercise[];

  constructor(private trainingService: TrainingService) { }

  public onStartTraining(newTrainingForm: NgForm): void {
    this.trainingService.startExercise(newTrainingForm.value.exercise);
  }

  ngOnInit(): void {
    this.availableExercises = this.trainingService.getAvailableExercises();
  }
}
