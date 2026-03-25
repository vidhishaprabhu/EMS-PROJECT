import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../services/dashboard/employee.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-leave',
  imports: [DatePipe, FormsModule],
  templateUrl: './my-leave.component.html',
  styleUrl: './my-leave.component.css',
})
export class MyLeaveComponent {
  employeeService = inject(EmployeeService);
  router = inject(Router);
  searchId: string = '';
  filteredLeave: any = [];
  nodatafound: boolean = false;
  leaves: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 1;

  ngOnInit() {
    this.getLeaveInfo();
  }

  searchLeave() {
    if (!this.searchId) {
      this.filteredLeave = this.leaves;
      this.nodatafound = false;
      return;
    }
    this.filteredLeave = this.leaves.filter((emp: any) =>
      emp.status
        .toString()
        .toLowerCase()
        .includes(this.searchId.toLowerCase()),
    );

    this.nodatafound = this.filteredLeave.length === 0;
    this.currentPage = 1;
  }

  getLeaveInfo() {
    this.employeeService.getLeaveInfo().subscribe((res: any) => {
      console.log('dsdfdf', res);
      this.leaves = Object.values(res.leave);
      this.filteredLeave = res.leave;
      this.currentPage = 1;
    });
  }

  get totalPages() {
    return Math.ceil(this.filteredLeave.length / this.itemsPerPage) || 1;
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
  addNewLeave() {
    this.router.navigate(['/employee/add-my-leave-form']);
  }

  get paginatedLeave() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredLeave.slice(start, end);
  }
}
