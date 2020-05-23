import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

  registerUser(nombre, apellido, email, password, role){
    this.setHeaders();
    const url_api = this.api.url_api+'/user/admin/registerUser';
    return this.http
    .post(url_api, {
      nombre:nombre, 
      apellido:apellido, 
      email:email, 
      password:password,
      role: role
    }, this.options);
  }

  updateUser(nombre, apellido, email, password, role, username){
    this.setHeaders();
    const url_api = this.api.url_api+'/user/admin/updateUser';
    return this.http
    .put(url_api, {
      nombre:nombre, 
      apellido:apellido, 
      email:email, 
      password:password,
      role: role,
      username:username
    }, this.options);
  }

  deleteUser(username){
    this.setHeaders();
    const url_api = this.api.url_api+'/user/admin/deleteUser/'+username;
    return this.http.delete(url_api, this.options);

  }

  getAllUsers(){
    this.setHeaders();
    const url_api = this.api.url_api+'/user/admin/getAllUsers';

    return this.http.get(url_api, this.options);
  }
}
