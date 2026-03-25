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
  currentPage: number = 1;
  itemsPerPage: number = 1;
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

  this.nodatafound = this.filteredSalary.length === 0;
    this.currentPage = 1;
}

get totalPages() {
    return Math.ceil(this.filteredSalary.length / this.itemsPerPage) || 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get paginatedSalary() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredSalary.slice(start, end);
  }

}
