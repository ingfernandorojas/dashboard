import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private Login: LoginService, private router: Router) { }


  loginForm: FormGroup;
  submitted = false;
  loginFailed = false;
  
  // Error Message
  showLoginError = false;
  showServerError = false;

  ngOnInit(): void {
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.login();
  }

  login(){
    this.Login.loginUser
    (this.loginForm.controls['email'].value, 
    this.loginForm.controls['password'].value)
              .subscribe(
                data => {
                  data 
                  localStorage.setItem('token',data['token']); 
                  if(jwt_decode(data['token'])['role'] == "admin"){
                    this.router.navigate(['/dashboard']);
                  }else if(jwt_decode(data['token'])['role'] == "user"){
                    this.router.navigate(['/sell']);
                  }
                },
                  error => {
                    if(error['status'] == 401){
                      this.loginFailed = true;
                      console.log(error)
                    }
                  }
              )    
  }

}
