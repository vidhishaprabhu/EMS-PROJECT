import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { EmployeeService } from '../../../services/dashboard/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  imports: [],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {

  authService=inject(AuthService)
  employeeService=inject(EmployeeService);
  user:any

  leaves:any=[]

  ngOnInit(){
    this.user=this.authService.getUser();
  }

  getLeaves(){
    this.employeeService.getLeaveInfo().subscribe((res:any)=>{
      this.leaves=res.leave
    })
  }
  

}
