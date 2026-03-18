import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }
  http=inject(HttpClient)

  getAdminDashboard(){
    return this.http.get(`${environment.apiUrl}/dashboard/admin-dashboard`);
  }

  getAllEmployee(){
    return this.http.get(`${environment.apiUrl}/employee`)
  }

}
