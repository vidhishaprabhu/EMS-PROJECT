import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}
  http = inject(HttpClient);

  getAdminDashboard() {
    return this.http.get(`${environment.apiUrl}/dashboard/admin-dashboard`);
  }

  getAllEmployee() {
    return this.http.get(`${environment.apiUrl}/employee`);
  }

  getAllDept() {
    return this.http.get(`${environment.apiUrl}/department`);
  }

  getAllLeave(){
    return this.http.get(`${environment.apiUrl}/leave`)
  }

  addEmployees(
    name: string,
    email: string,
    password: string,
    department: string,
    position: string,
    role: string,
    image: string,
    gender: string,
    dateOfBirth: string,
  ) {
    const body = {
      name,
      email,
      password,
      department,
      position,
      role,
      image,
      gender,
      dateOfBirth,
    };
    return this.http.post(`${environment.apiUrl}/employee/`, body);
  }

  addDepartment(name:string,description:string){
    const body={name,description}
    return this.http.post(`${environment.apiUrl}/department`,body);
  }

  addSalaries(employee:string,basic:string,bonus:string,department:string,deduction:string,total:string){
    const body={employee,basic,bonus,department,deduction,total}
    return this.http.post(`${environment.apiUrl}/salary`,body);
  }
  getEmployeeById(id: string) {
    return this.http.get(`${environment.apiUrl}/employee/${id}`);
  }

  getSalaryById(id: string) {
    return this.http.get(`${environment.apiUrl}/salary/employee/${id}`);
  }

  getLeaveInfo(id: string) {
    return this.http.get(`${environment.apiUrl}/leave/employee/${id}`);
  }

  getLeaveById(id:string){
    return this.http.get(`${environment.apiUrl}/leave/${id}`);
  }
  getDepartmentById(id:string){
    return this.http.get(`${environment.apiUrl}/department/${id}`)
  }
  
  updateEmployee(
    id: string,
    name: string,
    email: string,
    department: string,
    position: string,
    image: string,
    gender: string,
    dateOfBirth: string,
  ) {
    const body = {
      name,
      email,
      department,
      position,
      image,
      gender,
      dateOfBirth,
    };
    return this.http.put(`${environment.apiUrl}/employee/${id}`, body);
  }
  updateDepartment(id:string,name:string,description:string){
    const body={name,description};
    return this.http.put(`${environment.apiUrl}/department/${id}`,body);
  }
  deleteEmployee(id:string){
    return this.http.delete(`${environment.apiUrl}/employee/${id}`)
  }
  deleteDepartment(id:string){
    return this.http.delete(`${environment.apiUrl}/department/${id}`)
  }
  deleteLeave(id:string){
    return this.http.delete(`${environment.apiUrl}/leave/${id}`)
  }
  updateStatusInLeave(id:string,status:string){
    return this.http.patch(`${environment.apiUrl}/leave/update-status/${id}`,{status})
  }

}
