import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../services/dashboard/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  imports: [DatePipe],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  employeeService=inject(EmployeeService)
  employee:any=[]
  ngOnInit(){
    this.getEmployeeInfo()
  }
  getEmployeeInfo(){
    this.employeeService.getEmployeeInfo().subscribe((res:any)=>{
      this.employee=res.employee
    })
  }
}
