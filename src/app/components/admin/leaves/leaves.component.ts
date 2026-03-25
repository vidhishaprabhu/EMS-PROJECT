import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leaves',
  imports: [DatePipe, FormsModule],
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.css',
})
export class LeavesComponent {
  leaves: any = [];
  activeFilter: string = 'All';
  filteredLeaves: any = [];
  adminService = inject(AdminService);
  searchId: string = '';
  nodatafound: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  router = inject(Router);
  ngOnInit() {
    this.getAllLeaves();
  }
  getAllLeaves() {
    this.adminService.getAllLeave().subscribe((res: any) => {
      this.leaves = res.leave;
      this.filteredLeaves = res.leave;
      this.currentPage = 1;
    });
  }
  deleteLeave(id: string) {
    this.adminService.deleteLeave(id).subscribe((res: any) => {
      alert(res.message);
      this.getAllLeaves();
    });
  }
  viewLeaveDetails(id: string) {
    this.router.navigate(['/admin/view-leave-details', id]);
  }
  get totalPages() {
    return Math.ceil(this.filteredLeaves.length / this.itemsPerPage) || 1;
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
  applyFilters() {
    this.filteredLeaves = this.leaves.filter((leave: any) => {
      const statusMatch =
        this.activeFilter === 'All' || leave.status === this.activeFilter;

      const empMatch =
        !this.searchId ||
        leave.employee
          .toString()
          .toLowerCase()
          .includes(this.searchId.toLowerCase());

      return statusMatch && empMatch;
    });

    // 🔥 No data check
    this.nodatafound = this.filteredLeaves.length === 0;
    this.currentPage = 1;
  }

  get paginatedLeaves() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredLeaves.slice(start, end);
  }
  filterLeaves(status: string) {
    this.activeFilter = status;
    this.applyFilters();
  }
  filterByEmpId() {
    this.applyFilters();
  }
}
