import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
public name!: FormControl;
public lastName!: FormControl;
public email!: FormControl;
public password!: FormControl;

public loginForm!: FormGroup;

  constructor() {
    this.initForm();
   }

  ngOnInit() {
  }


  public doLogin() {
    console.log (this.loginForm.value);
    this.loginForm.reset();
  }

private initForm() {
  this.name = new FormControl('', [Validators.required]);
  this.lastName = new FormControl('', [Validators.required]);
  this.email = new FormControl('', [Validators.required, Validators.email]);
  this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  


  this.loginForm = new FormGroup({
    name: this.name,
    lastName: this.lastName,
    password: this.password,
    email: this.email,
  });
}

}
