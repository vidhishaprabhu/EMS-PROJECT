import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  adminService=inject(AdminService);
  ngOnInit(){
    // this.adminService.getAdminDashboard().subscribe((res:any)=>{
    //   console.log(res);
    // })

  }

}
