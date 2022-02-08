import { Subscription } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'fit-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  private _loadingSubscription!: Subscription;

  //Same instance of authService in signup and in login because it was provided in app.module
  constructor(private readonly _authService: AuthService, private readonly _uiService: UiService) { }

  public onSubmit() {

    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnInit(): void {
    this._loadingSubscription = this._uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnDestroy(): void {
    this._loadingSubscription.unsubscribe();
  }
}
