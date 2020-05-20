import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  token = localStorage.getItem('token');
  headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.token });
  options = { headers: this.headers }; 

  registerUser(nombre, apellido, email, password, role){
    const url_api = 'http://localhost:3000/user/admin/registerUser';
    return this.http
    .post(url_api, {
      nombre:nombre, 
      apellido:apellido, 
      email:email, 
      password:password,
      role: role
    }, this.options);
  }

  deleteUser(username){

    const url_api = 'http://localhost:3000/user/admin/deleteUser/'+username;
    return this.http.delete(url_api, this.options);

  }

  getAllUsers(){
    const url_api = 'http://localhost:3000/user/admin/getAllUsers';
    return this.http.get(url_api, this.options);
  }
}
