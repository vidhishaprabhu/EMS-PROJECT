import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  http=inject(HttpClient);

  getEmployeeInfo(){
    return this.http.get(`${environment.apiUrl}/employee/profile`)
  }
  getLeaveInfo(){
    return this.http.get(`${environment.apiUrl}/leave/my-leaves`)
  }
}
