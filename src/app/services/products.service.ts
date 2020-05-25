import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  api = new Config();

  token = "";
  headers: HttpHeaders;
  options = {};

  setHeaders(){
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.token });
    this.options = { headers: this.headers }; 
  }

  registerProduct(idproducto,nombre, stock, costo, precio, iva){
    this.setHeaders();
    const url_api = this.api.url_api+'/product/admin/registerProduct';
    return this.http
    .post(url_api, {
      idproducto: idproducto,
      nombre:nombre, 
      stock:stock, 
      costo:costo, 
      precio:precio,
      iva: iva
    }, this.options);
  }

  updateProduct(idproducto,nombre, stock, costo, precio, iva){
    this.setHeaders();
    const url_api = this.api.url_api+'/product/admin/updateProduct';
    return this.http
    .put(url_api, {
      idproducto: idproducto,
      nombre:nombre, 
      stock:stock, 
      costo:costo, 
      precio:precio,
      iva: iva
    }, this.options);
  }

  deleteProduct(idproducto){
    this.setHeaders();
    const url_api = this.api.url_api+'/product/admin/deleteProduct/'+idproducto;
    return this.http.delete(url_api, this.options);

  }

  getAllProducts(search){
    this.setHeaders();
    const url_api = this.api.url_api+'/product/admin/getAllProducts/'+search;

    return this.http.get(url_api, this.options);
  }

  getOneProduct(search){
    this.setHeaders();
    const url_api = this.api.url_api+'/product/user/getOneProduct/'+search;

    return this.http.get(url_api, this.options);
  }
}
