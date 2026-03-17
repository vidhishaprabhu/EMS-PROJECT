import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  // getAdminDashboard(){
  //   return this.http.get(`${environment.apiUrl}/dashboard/admin-dashboard`);
  // }
}
