import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  http=inject(HttpClient)
  loginEmployee(email:string,password:string){
    const body={email,password}
    return this.http.post(`${environment.apiUrl}/admin/login-admin`,body);
  }
}
