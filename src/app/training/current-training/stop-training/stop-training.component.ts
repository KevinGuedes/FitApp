import { StopTrainingDialogData } from './stop-training-dialog-data.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fit-stop-training',
  templateUrl: './stop-training.component.html',
  styleUrls: ['./stop-training.component.scss']
})
export class StopTrainingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: StopTrainingDialogData) { }

  ngOnInit(): void {
  }
}
