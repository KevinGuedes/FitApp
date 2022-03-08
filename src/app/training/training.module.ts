import { TrainingRoutingModule } from './training-routing.module';
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { StoreModule } from '@ngrx/store';
import * as fromTraining from '../state/training/training.reducer';

@NgModule({
    declarations: [
        NewTrainingComponent,
        PastTrainingsComponent,
        CurrentTrainingComponent,
        TrainingComponent,
        StopTrainingComponent,
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature(fromTraining.trainingKey, fromTraining.trainingReducer), //because this is a lazy loaded module
    ],
    exports: [],
    entryComponents: [StopTrainingComponent], //Because it will be created programmatically (it is a dialog)
    //No providers here because thay will be provided in app module and then to the whole application as singleton
})
export class TrainingModule { }
