import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private Users: UsersService, 
    private formBuilder: FormBuilder, 
    private register: UsersService,
    ) { }

  tabla: any[] = [];
  page = 1;
  pageSize = 4;

  registerForm: FormGroup;
  buttonText = "Registrar";
  isUpdate = false;
  username = "";
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

    if(this.isUpdate){

      this.register.updateUser(
        this.registerForm.controls['name'].value,
        this.registerForm.controls['lastname'].value,
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value,
        this.registerForm.controls['role'].value,
        this.username
      ).subscribe(
        data => {
          Swal.fire(
            'Correcto',
             'El usuario ha sido actualizado correctamente',
            'success'
          )
        },
        error => {
          console.error(
            Swal.fire(
              'Error',
               error['statusText'],
              'error'
            )
          )
        }
      );

    }else{
      this.register.registerUser(
        this.registerForm.controls['name'].value,
        this.registerForm.controls['lastname'].value,
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value,
        this.registerForm.controls['role'].value
      ).subscribe(
        data => {
          Swal.fire(
            'Correcto',
             'El usuario ha sido añadido correctamente',
            'success'
          )
        },
        error => {
          console.error(
            Swal.fire(
              'Error',
               error['statusText'],
              'error'
            )
          )
        }
      );
    }

    
    this.showData();
    this.resetForm(this.registerForm);
  }

  showData(){

    this.Users.getAllUsers()
              .subscribe(
                data => {
                  this.tabla = data["data"];    
                },
                  error => {
                    Swal.fire(
                      'Error',
                       error['statusText'],
                      'error'
                    )
                  }
              )        

  }

  resetForm(formGroup: FormGroup) {
    this.buttonText = "Registrar";
    this.isUpdate = false;
    this.username = '';
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
   
    this.buttonText = "Actualizar";
    this.isUpdate = true;
    this.username = username;

    for(let i = 0; i < this.tabla.length; i++){

      if(this.tabla[i]['username'] == username){

        this.registerForm.controls['name'].setValue(this.tabla[i]['nombre']);
        this.registerForm.controls['lastname'].setValue(this.tabla[i]['apellido']);
        this.registerForm.controls['email'].setValue(this.tabla[i]['email']);
        this.registerForm.controls['role'].setValue(this.tabla[i]['role']);
        return false;

      }

    }

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
        this.Users.deleteUser(username)
                  .subscribe(
                    data => {
                      Swal.fire(
                        'Eliminado',
                        'El usuario ha sido eliminado',
                        'success'
                      )
                      this.showData();
                    },
                    error => {
                      Swal.fire(
                        'Error',
                         error['statusText'],
                        'error'
                      )
                      
                    }
                  )
        
      }
    })
    
  }

  buscar(event: KeyboardEvent){

    // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
    
  }


}


