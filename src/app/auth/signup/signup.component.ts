import { AuthService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fit-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public maxDate: Date = new Date();
  public isStudy: boolean = false;

  constructor(private readonly _authService: AuthService) {
  }

  public onSubmit(signupForm: NgForm) {
    this._authService.registerUser({
      email: signupForm.value.email,
      password: signupForm.value.password
    });
  }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
}
