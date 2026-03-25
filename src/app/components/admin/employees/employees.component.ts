import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  imports: [RouterLink, DatePipe, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  adminService = inject(AdminService);
  router = inject(Router);
  searchId: string = '';
  employees: any = [];
  filteredEmployee: any = [];
  leaves: any = [];
  nodatafound:boolean=false
  currentPage: number = 1;
  itemsPerPage: number = 2;

  ngOnInit() {
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.adminService.getAllEmployee().subscribe((res: any) => {
      this.employees = res.employee;
      this.filteredEmployee = res.employee;
      console.log(this.employees);
      this.currentPage = 1;
    });
  }
  get totalPages() {
    return Math.ceil(this.filteredEmployee.length / this.itemsPerPage) || 1;
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
  searchEmployee() {
  if (!this.searchId) {
    this.filteredEmployee = this.employees;
    this.nodatafound = false; 
    return;
  }
  this.filteredEmployee = this.employees.filter((emp: any) =>
    emp.name.toLowerCase().includes(this.searchId.toLowerCase())
  );

   this.nodatafound = this.filteredEmployee.length === 0;
    this.currentPage = 1;
}
  viewEmployee(id: string) {
    this.router.navigate(['/admin/view-employee', id]);
  }
  viewSalary(id: string) {
    this.router.navigate(['/admin/view-salary', id]);
  }
  viewLeave(leave: any) {
    this.router.navigate(['/admin/view-leave', leave]);
  }
  editEmployee(id: string) {
    this.router.navigate(['/admin/add-employee', id]);
  }
  addEmp() {
    this.router.navigate(['/admin/add-employee']);
  }
  deleteEmployee(id: string) {
    this.adminService.deleteEmployee(id).subscribe((res: any) => {
      alert(res.message);
      this.getAllEmployees();
    });
  }
  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEmployee.slice(start, end);
  }
}
