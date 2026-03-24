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
  getSalaryInfo(){
    return this.http.get(`${environment.apiUrl}/salary/get-salary`)
  }
  changePassword(currentPassword:string,newPassword:string,confirmPassword:string){
    const body={currentPassword,newPassword,confirmPassword}
    return this.http.put(`${environment.apiUrl}/employee/change-password-employee`,body)
  }
  addLeave(employee:string,fromDate:string,toDate:string,leaveType:string,reason:string){
    const body={employee,fromDate,toDate,leaveType,reason}
    return this.http.post(`${environment.apiUrl}/leave`,body);
  }
}
