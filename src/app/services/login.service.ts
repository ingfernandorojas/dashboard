import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  api = new Config();
  headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'});
  options = { headers: this.headers };

  loginUser(email, password){
    const url_api = this.api.url_api+'/user/login';
    return this.http
    .post(url_api, {
      email:email, 
      password:password
    }, this.options);
  }
}
