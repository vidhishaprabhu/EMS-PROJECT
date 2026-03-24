import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  http = inject(HttpClient);
  router = inject(Router);
  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${environment.apiUrl}/employee/login-admin-employee`, body);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
  setUser(user:any){
    let users = localStorage.setItem('user', JSON.stringify(user));
    console.log(users);
    return users;
  }
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  forgetPasswordEmployee(email:string,newPassword:string,confirmPassword:string){
    const body={email,newPassword,confirmPassword}
    return this.http.put(`${environment.apiUrl}/employee/forget-password-employee`,body)
  }
}
