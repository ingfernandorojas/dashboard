import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(nombre, apellido, username, email, password, role){
    const url_api = 'http://localhost:3000/user/admin/registerUser';
    return this.http
    .post<Users>(url_api, {
      nombre:nombre, 
      apellido:apellido,
      username:username, 
      email:email, 
      password:password,
      role: role
    }
    );
  }

  getAllUsers(){

    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token });
    let options = { headers: headers }; 
    const url_api = 'http://localhost:3000/user/admin/getAllUsers';
    return this.http.get(url_api, options);
  }
}
