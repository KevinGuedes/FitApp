import { TrainingService } from './../training.service';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.interface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../state/app/app.reducer';
import * as fromUiSelectors from '../../state/ui/ui.selectors';

@Component({
  selector: 'fit-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['name', 'calories', 'duration', 'state', 'date'];
  public dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>();
  public isLoading$!: Observable<boolean>;
  public get isTableDataAvailable(): boolean {
    return this.dataSource.data.length > 0;
  }

  private _finishedExercisesSubscription!: Subscription;

  constructor(
    private readonly _trainingService: TrainingService,
    private readonly _store: Store<fromRoot.AppState>,
  ) { }

  public fetchCompletedOrCancelledExercises(): void {
    this._trainingService.fetchCompletedOrCancelledExercises();
  }

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromUiSelectors.selectIsLoading);
    this._finishedExercisesSubscription = this._trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => this.dataSource.data = exercises);
    this.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this._finishedExercisesSubscription.unsubscribe();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
