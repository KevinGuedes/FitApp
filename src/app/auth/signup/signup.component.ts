import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fit-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public maxDate: Date;
  public isStudy: boolean;

  constructor() {
    this.isStudy = environment.isStudy;
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(signupForm: NgForm) {
    console.log(signupForm);
  }

}
