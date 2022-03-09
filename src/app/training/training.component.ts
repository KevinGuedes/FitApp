import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './../state/app/app.reducer';
import * as fromTrainingSelectors from './../state/training/training.selectors';

@Component({
  selector: 'fit-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  public ongoingTraining$!: Observable<boolean>;

  constructor(
    private readonly _store: Store<fromRoot.AppState>
  ) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this._store.select(fromTrainingSelectors.selectIsTraining);
  }
}
