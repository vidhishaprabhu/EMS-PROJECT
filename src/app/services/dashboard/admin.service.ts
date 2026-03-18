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
  
  getAllDept(){
    return this.http.get(`${environment.apiUrl}/department`)
  }

  addEmployees(
    name: string,
    email: string,
    password: string,
    department: string,
    position: string,
    role: string,
    image: string,
  ) {
    const body = { name, email, password, department, position, role, image };
    return this.http.post(`${environment.apiUrl}/employee/`, body);
  }
}
