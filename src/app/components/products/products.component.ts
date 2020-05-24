import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder, 
    private register: ProductsService,
    ) { }

  tabla: any[] = [];
  page = 1;
  pageSize = 5;
  showPagination = true;

  registerForm: FormGroup;
  buttonText = "Registrar";
  isUpdate = false;
  isSearch = "";
  idProduct = "";
  submitted = false;

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      idproducto: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      precio: ['',[Validators.required]],
      iva: ['',[Validators.required]]
    });
    this.showData('nosearch');
  }

  get f() { return this.registerForm.controls; }
  
 
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return false;
    }

    if(this.isUpdate){

      this.register.updateProduct(
        this.registerForm.controls['idproducto'].value,
        this.registerForm.controls['nombre'].value,
        this.registerForm.controls['stock'].value,
        this.registerForm.controls['costo'].value,
        this.registerForm.controls['precio'].value,
        this.registerForm.controls['iva'].value
      ).subscribe(
        data => {
          Swal.fire(
            'Correcto',
             'El producto ha sido actualizado correctamente',
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
      this.register.registerProduct(
        this.registerForm.controls['idproducto'].value,
        this.registerForm.controls['nombre'].value,
        this.registerForm.controls['stock'].value,
        this.registerForm.controls['costo'].value,
        this.registerForm.controls['precio'].value,
        this.registerForm.controls['iva'].value
      ).subscribe(
        data => {
          Swal.fire(
            'Correcto',
             'El producto ha sido añadido correctamente',
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

    
    this.showData('nosearch');
    this.resetForm(this.registerForm);
  }

  showData(search){

    this.register.getAllProducts(search)
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
    this.idProduct = '';
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];

      // Al hacer reset, el select queda en blanco
      // if(name == 'role'){
      //   formGroup.controls['role'].setValue('');
      // }
      // Esto lo soluciona

      control.setErrors(null);
    });

  }

  edit(idProduct){
   
    this.buttonText = "Actualizar";
    this.isUpdate = true;
    this.idProduct = idProduct;

    for(let i = 0; i < this.tabla.length; i++){

      if(this.tabla[i]['idproducto'] == idProduct){

        this.registerForm.controls['idproducto'].setValue(this.tabla[i]['idproducto']);
        this.registerForm.controls['nombre'].setValue(this.tabla[i]['nombre']);
        this.registerForm.controls['stock'].setValue(this.tabla[i]['stock']);
        this.registerForm.controls['costo'].setValue(this.tabla[i]['costo']);
        this.registerForm.controls['precio'].setValue(this.tabla[i]['precio']);
        this.registerForm.controls['iva'].setValue(this.tabla[i]['iva']);
        return false;

      }

    }

  }

  delete(idproducto){

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.register.deleteProduct(idproducto)
                  .subscribe(
                    data => {
                      Swal.fire(
                        'Eliminado',
                        'El producto ha sido eliminado',
                        'success'
                      )
                      this.showData('nosearch');
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
    var input, filter;
    input = document.getElementById("search");
    filter = input.value;
    if(filter == ""){
      filter = "nosearch"
    }
    this.isSearch = "Buscando";

    this.register.getAllProducts(filter)
              .subscribe(
                data => {
                  this.tabla = data["data"]; 
                  this.isSearch = "";   
                }
              )
    
  }


}