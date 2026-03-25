import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../services/dashboard/employee.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-salary',
  imports: [DatePipe,FormsModule],
  templateUrl: './my-salary.component.html',
  styleUrl: './my-salary.component.css'
})
export class MySalaryComponent {
  salaries:any=[]
  searchId:string=''
  filteredSalary:any=[]
  nodatafound:boolean=false
  employeeService=inject(EmployeeService)
  ngOnInit(){
    this.getSalaryInfo()
  }
  getSalaryInfo(){
    this.employeeService.getSalaryInfo().subscribe((res:any)=>{
      this.salaries=res.salary
      this.filteredSalary=res.salary
    })
  }
  searchSalary() {
  if (!this.searchId) {
    this.filteredSalary = this.salaries;
    this.nodatafound = false; 
    return;
  }
  this.filteredSalary = this.salaries.filter((emp: any) =>
  emp.basic
    .toString()
    .includes(this.searchId)
);

  if (this.filteredSalary.length === 0) {
    this.nodatafound = true;
  } else {
    this.nodatafound = false;
  }
}

}
