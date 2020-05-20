import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  constructor(private Users: UsersService, private formBuilder: FormBuilder, private register: UsersService) { }
  
  
  tabla: any[] = [];
  page = 1;
  pageSize = 4;
  

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

    
    this.showData();
    this.resetForm(this.registerForm);
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

  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];

      // Al hacer reset, el select queda en blanco
      if(name == 'role'){
        formGroup.controls['role'].setValue('');
      }
      // Esto lo soluciona

      control.setErrors(null);
    });
  }

  edit(username){
    alert(username)
  }

  delete(username){

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '(Eliminado',
          'El usuario ha sido eliminado',
          'success'
        )
      }
    })
    
  }


}


