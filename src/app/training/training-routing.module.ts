import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TrainingComponent } from './training.component';

const routes: Routes = [
    { path: '', component: TrainingComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)], //will merge this routes with the others behind the hood
    exports: [RouterModule],
})
export class TrainingRoutingModule { }
//This module is eagerly loaded
