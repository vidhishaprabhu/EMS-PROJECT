import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { EmployeeService } from '../../../services/dashboard/employee.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  imports: [RouterLink],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {

  authService=inject(AuthService)
  employeeService=inject(EmployeeService);
  user:any

  totalLeaves:number=0;
  pendingLeaves:number=0;
  approvedLeaves:number=0;
  rejectedLeaves:number=0;
  totalSalary:number=0;
  leaveData:any=[]

  leaves:any=[]
  employees:any=[]
  salaries:any=[]

  ngOnInit(){
    this.user=this.authService.getUser();
    this.getEmployeeKpi()
    this.getEmployeeDeatils()
    this.getTotalLeaveBalance()
    this.getSalaryInfo()
  }

  getLeaves(){
    this.employeeService.getLeaveInfo().subscribe((res:any)=>{
      this.leaves=res.leave
    })
  }
  getEmployeeDeatils(){
    this.employeeService.getEmployeeInfo().subscribe((res:any)=>{
      this.employees=res.employee
    })

  }
  getEmployeeKpi(){
    this.employeeService.getEmployeeDashboard().subscribe((res:any)=>{
      this.totalLeaves=res.totalLeaves
      console.log("Total Leaves",this.totalLeaves)
      this.pendingLeaves=res.pendingLeaves
      console.log("Pending Leaves",this.pendingLeaves)
      this.approvedLeaves=res.approvedLeaves
      console.log("Appreoved Leaves",this.approvedLeaves)
      this.rejectedLeaves=res.rejectedLeaves
      console.log("Rejected Leaves",this.rejectedLeaves)
      this.totalSalary=res.totalSalalry
      console.log("Total Salary",this.totalSalary)
    })

  }
  getTotalLeaveBalance(){
    this.employeeService.getLeaveBalance().subscribe((res:any)=>{
      this.leaveData=res

    })
  }
  getSalaryInfo(){
    this.employeeService.getSalaryInfo().subscribe((res:any)=>{
      console.log("Salary respone",res)
      this.salaries=res.salary
      // console.log("Salary",this.salaries)
    })
  }

  get total(){
    return this.leaveData.sick.taken+this.leaveData.casual.taken+this.leaveData.privilege.taken+this.leaveData.unpaid.taken
  }
  

}
