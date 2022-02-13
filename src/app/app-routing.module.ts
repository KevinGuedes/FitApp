import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    {
        path: 'training',
        loadChildren: () => import('./training/training.module').then(m => m.TrainingModule),
        canLoad: [AuthGuard]
        //Will be downloaded only if user is authenticated
        //If we are targeting this route, it will load the code on TrainingModule (Routes, imports, modules)
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard] //only if the is no 'provided in root' on the AuthGuard class
    //canActivate receives an array of classes that implements the CanActivate interface. The canActivate method of them will be executed
})
export class AppRoutingModule { }
