import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  constructor(private Users: UsersService, private formBuilder: FormBuilder, private register: UsersService) { }
  

  
  tabla: any[] = [];
  page = 1;
  pageSize = 10;
  

  registerForm: FormGroup;
  submitted = false;

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['',[Validators.required]]
    });
    this.showData();
    
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
      this.registerForm.controls['email'].value,
      this.registerForm.controls['password'].value,
      this.registerForm.controls['role'].value
    ).subscribe(
      data => {
        console.log()
      },
      error => {
        console.error(error)
      }
    )

    
    this.showData()

  }

  showData(){

    this.Users.getAllUsers()
              .subscribe(
                data => {
                  this.tabla = data["data"];
                  
                },
                error => {console.error(error)}
              )        

  }

}
