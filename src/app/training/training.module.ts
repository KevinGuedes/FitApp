import { CommonModule } from "@angular/common";

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { FormsModule } from "@angular/forms";
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';

@NgModule({
    declarations: [
        NewTrainingComponent,
        PastTrainingsComponent,
        CurrentTrainingComponent,
        TrainingComponent,
        StopTrainingComponent,
    ],
    imports: [
        CommonModule, //provides ngIf and so on
        FormsModule,
        MaterialModule, //Wont be imported twice (here and in AppModule) because Angular does the module management for us
        FlexLayoutModule,
    ],
    exports: [],
    entryComponents: [StopTrainingComponent], //Because it will be created programmatically (it is a dialog)
    //No providers here because thay will be provided in app module and then to the whole application as singleton
})
export class TrainingModule { }
