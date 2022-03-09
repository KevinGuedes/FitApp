import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../state/app/app.reducer';
import * as fromUiSelectors from '../../state/ui/ui.selectors';

@Component({
  selector: 'fit-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading$!: Observable<boolean>;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  //Same instance of authService in signup and in login because it was provided in app.module
  constructor(
    private readonly _authService: AuthService,
    private readonly _store: Store<fromRoot.AppState>
  ) { }

  public onSubmit() {
    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromUiSelectors.selectIsLoading);
  }
}
