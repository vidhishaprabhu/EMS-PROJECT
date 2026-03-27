import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../services/dashboard/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pay-slip',
  imports: [DatePipe],
  templateUrl: './pay-slip.component.html',
  styleUrl: './pay-slip.component.css'
})
export class PaySlipComponent {
  employeeService=inject(EmployeeService)
  salaries:any=[]
  employees:any=[]
  departments:any=[]
  today = new Date();
  ngOnInit(){
    this.getSalaryInfo()
    this.getEmployeeInfo()
    this.getDepartmentInfo()
  }
  getSalaryInfo(){
    this.employeeService.getSalaryInfo().subscribe((res:any)=>{
      this.salaries=res.salary
    })
  }
  getEmployeeInfo(){
    this.employeeService.getEmployeeInfo().subscribe((res:any)=>{
      this.employees=res.employee
    })
  }
  getDepartmentInfo(){
    this.employeeService.getDeptInfo().subscribe((res:any)=>{
      this.departments=res.department
      console.log("department ",this.departments)
    })
  }
}
