import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { provideAuth, getAuth } from '@angular/fire/auth';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule, //provides ngIf and so on
        FormsModule,
        ReactiveFormsModule,
        MaterialModule, //Wont be imported twice (here and in AppModule) because Angular does the module management for us
        FlexLayoutModule,
        provideAuth(() => getAuth()),
    ],
    exports: [],
    //No providers here because thay will be provided in app module and then to the whole application as singleton
})
export class AuthModule { }
