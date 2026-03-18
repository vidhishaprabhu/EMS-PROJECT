import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  adminService = inject(AdminService);
  totalEmp:number=0;
  totalDept:number=0;
  totalLeave:number=0;
  leave:any=[]
  totalPendingLeaves:number=0;
  totalSalary:number=0;
  ngOnInit() {
    this.getAllEmpDetails()
  }
  getAllEmpDetails(){
    this.adminService.getAdminDashboard().subscribe((res: any) => {
      this.totalEmp=res.totalEmp;
      console.log("Total Employee ",this.totalEmp);
      this.totalDept=res.totalDept
      console.log("Total department",this.totalDept);
      this.totalLeave=res.totalLeaves
      console.log("Total Leaves ",this.totalLeave)
      this.totalPendingLeaves=res.totalPendingLeaves;
      console.log("Pending leaves",this.totalPendingLeaves)
      this.totalSalary=res.totalSalary;
      console.log("Total Salary",this.totalSalary)
    });
  }
  
}
