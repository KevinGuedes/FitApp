import { Observable } from 'rxjs';
import { AuthService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../state/app/app.reducer';
import * as fromUiSelectors from '../../state/ui/ui.selectors';

@Component({
  selector: 'fit-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public maxDate: Date = new Date();
  public isStudy: boolean = false;
  public isLoading$!: Observable<boolean>;

  constructor(
    private readonly _authService: AuthService,
    private readonly _store: Store<fromRoot.AppState>
  ) { }

  public onSubmit(signupForm: NgForm) {
    this._authService.registerUser({
      email: signupForm.value.email,
      password: signupForm.value.password
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromUiSelectors.selectIsLoading);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
}
