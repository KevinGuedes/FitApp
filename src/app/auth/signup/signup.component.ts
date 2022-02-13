import { AuthService } from './../auth-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fit-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public maxDate: Date = new Date();
  public isStudy: boolean = false;
  public isLoading: boolean = false;

  private _loadingSubscription!: Subscription;

  constructor(private readonly _authService: AuthService, private readonly _uiService: UiService) {
  }

  public onSubmit(signupForm: NgForm) {
    this._authService.registerUser({
      email: signupForm.value.email,
      password: signupForm.value.password
    });
  }

  ngOnInit(): void {
    this._loadingSubscription = this._uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnDestroy(): void {
    this._loadingSubscription.unsubscribe();
  }
}
