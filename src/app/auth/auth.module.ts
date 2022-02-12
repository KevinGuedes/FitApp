import { NgModule } from "@angular/core";
import { SharedModule } from './../shared/shared.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";

import { provideAuth, getAuth } from '@angular/fire/auth';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        provideAuth(() => getAuth()),
    ],
    exports: [],
    //No providers here because thay will be provided in app module and then to the whole application as singleton
})
export class AuthModule { }
