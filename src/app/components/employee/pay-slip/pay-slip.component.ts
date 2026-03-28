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
      console.log("Income tax",this.salaries?.[0]?.incomeTax )
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
  get totalEarnings(){
    return this.salaries[0].basic + this.salaries[0].bonus
  }

  get totalDeductions(){
    return this.salaries[0].pf + this.salaries[0].professionalTax + this.salaries[0].incomeTax
  }
  
}
