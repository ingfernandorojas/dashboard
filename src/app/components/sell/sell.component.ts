import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})


export class SellComponent implements OnInit {

  constructor(private product: ProductsService) { }
  
  // Muestra los datos de la tabla
  tabla = [];
  // Fin tabla

  // Muestra el mensaje: No hay productos
  mensajeTabla = true;
  // Fin mensaje
  
  // Para la paginacion
  page = 1;
  pageSize = 7;
  showPagination = true;
  // Fin paginacion

  sumaTotal = 0; 
  auxsumaTotal = 0; 
  vuelto = 0;
  auxVuelto = 0;
  
  ngOnInit(): void {
  }

  codigo(event: KeyboardEvent){
    var input, filter;
    input = document.getElementById("codigo");
    filter = input.value;

    if(event.keyCode != 13 && event.keyCode != 8){
      this.product.getOneProduct(filter).subscribe(
        data => {
  
          if(data['data'].length > 0){   
            this.tabla.push({
              idproducto: data['data'][0]['idproducto'],
              nombre: data['data'][0]['nombre'],
              precio: data['data'][0]['precio'],
              costo: data['data'][0]['costo'],
              iva: data['data'][0]['iva'],
              cantidad: 1
            });
            this.mensajeTabla = false;
            this.cleanCodigo();
            this.totalVenta();
          }
        }
      )
    }else if(event.keyCode == 13){
      if((<HTMLInputElement>document.getElementById("codigo")).value != ""){
        this.aumentarCantidad(parseInt((<HTMLInputElement>document.getElementById("codigo")).value))
      }
    }
  }

  aumentarCantidad(cantidad: number){
    if(this.tabla.length > 0){
      this.tabla[this.tabla.length - 1]['cantidad'] = cantidad;
      this.cleanCodigo();
      this.totalVenta();
    }else{
      this.cleanCodigo();
    }
  }

  cleanCodigo(){
    (<HTMLInputElement>document.getElementById("codigo")).value = ""
  }

  cleanEfectivo(){
    (<HTMLInputElement>document.getElementById("efectivo")).value = ""
  }
  
  
  totalVenta(){
    this.sumaTotal = 0;
    this.tabla.forEach(a => {
      this.sumaTotal += a.precio * a.cantidad;
    })
    this.auxsumaTotal = this.formatNumber(this.sumaTotal);
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  calcularVueltoOnPressKey(event: KeyboardEvent){
    this.calcularVuelto();
  }

  calcularVuelto(){
    
    if(this.tabla.length > 0){
      var efectivo = parseInt((<HTMLInputElement>document.getElementById("efectivo")).value);
      if(efectivo >= this.sumaTotal){
        this.vuelto = efectivo - this.sumaTotal;
        this.auxVuelto = this.formatNumber(this.vuelto);
      }
    }else{
      this.cleanCodigo();
    }
  }

  delete(index){

    Swal.fire({
      title: 'Mensaje',
      text: "¿Deseas eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar producto',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.tabla.splice(index,1);
        this.totalVenta();
        this.calcularVuelto();
        
        if(this.tabla.length < 1){
          this.cancelButton();
        }
      }
    })
    
  }

  isNumber(event): boolean {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  cancelButton(){

    this.tabla = [];
    this.vuelto = 0;
    this.sumaTotal = 0;
    this.auxVuelto = 0;
    this.auxsumaTotal = 0;
    this.cleanCodigo();
    this.cleanEfectivo();
    (<HTMLInputElement>document.getElementById("codigo")).focus();
    this.mensajeTabla = true;

  }

}
