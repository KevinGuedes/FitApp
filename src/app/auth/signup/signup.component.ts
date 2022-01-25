import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fit-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public isStudy: boolean;

  constructor() {
    this.isStudy = environment.isStudy;
  }

  ngOnInit(): void {
  }

  onSubmit(signupForm: NgForm) {
    console.log(signupForm);
  }

}
