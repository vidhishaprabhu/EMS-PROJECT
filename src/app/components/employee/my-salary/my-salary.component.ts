import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../services/dashboard/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-salary',
  imports: [DatePipe],
  templateUrl: './my-salary.component.html',
  styleUrl: './my-salary.component.css'
})
export class MySalaryComponent {
  salaries:any=[]
  employeeService=inject(EmployeeService)
  ngOnInit(){
    this.getSalaryInfo()
  }
  getSalaryInfo(){
    this.employeeService.getSalaryInfo().subscribe((res:any)=>{
      this.salaries=res.salary
    })
  }

}
