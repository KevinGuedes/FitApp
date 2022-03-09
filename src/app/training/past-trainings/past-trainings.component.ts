import { TrainingService } from './../training.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.interface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../state/app/app.reducer';
import * as fromUiSelectors from '../../state/ui/ui.selectors';
import * as fromTrainingSelectors from '../../state/training/training.selectors';

@Component({
  selector: 'fit-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['name', 'calories', 'duration', 'state', 'date'];
  public dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>();
  public isLoading$!: Observable<boolean>;
  public get isTableDataAvailable(): boolean {
    return this.dataSource.data.length > 0;
  }

  constructor(
    private readonly _trainingService: TrainingService,
    private readonly _store: Store<fromRoot.AppState>,
  ) { }

  public fetchCompletedOrCancelledExercises(): void {
    this._trainingService.fetchCompletedOrCancelledExercises();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromUiSelectors.selectIsLoading);
    this._store.select(fromTrainingSelectors.selectFinishedTrainings).subscribe((exercises: Exercise[]) => this.dataSource.data = exercises);
    this.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
