import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private register: UsersService) { }

  registerForm: FormGroup;
  submitted = false;

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: ['', [Validators.requiredTrue]]
    });

  }

  get f() { return this.registerForm.controls; }

  

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return false;
    }

    this.register.registerUser(
      this.registerForm.controls['name'].value,
      this.registerForm.controls['lastname'].value,
      'user'+this.makeid(5),
      this.registerForm.controls['email'].value,
      this.registerForm.controls['password'].value,
    ).subscribe(
      data => {
        console.log(data['data']['nombre'])
      },
      error => {
        console.error(error)
      }
    )

    
  } 

}
