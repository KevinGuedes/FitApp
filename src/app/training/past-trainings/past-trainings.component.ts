import { TrainingService } from './../training.service';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.interface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

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
  public isLoading: boolean = true;
  private _finishedExercisesSubscription!: Subscription;
  private _loadingSubscription!: Subscription;

  constructor(private readonly _trainingService: TrainingService, private readonly _uiService: UiService) { }

  ngOnInit(): void {
    this._loadingSubscription = this._uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    this._finishedExercisesSubscription = this._trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => this.dataSource.data = exercises);
    this._trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this._finishedExercisesSubscription.unsubscribe();
    this._loadingSubscription.unsubscribe();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
