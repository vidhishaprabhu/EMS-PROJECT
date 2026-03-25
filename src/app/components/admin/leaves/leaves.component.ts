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
  router = inject(Router);
  ngOnInit() {
    this.getAllLeaves();
  }
  getAllLeaves() {
    this.adminService.getAllLeave().subscribe((res: any) => {
      this.leaves = res.leave;
      this.filteredLeaves = res.leave;
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
  }
  filterLeaves(status: string) {
    this.activeFilter = status;
    this.applyFilters();
  }
  filterByEmpId() {
    this.applyFilters();
  }
}
