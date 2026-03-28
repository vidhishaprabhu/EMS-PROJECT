import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../services/dashboard/employee.service';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/dashboard/admin.service';

@Component({
  selector: 'app-view-bank-details',
  imports: [RouterLink],
  templateUrl: './view-bank-details.component.html',
  styleUrl: './view-bank-details.component.css',
})
export class ViewBankDetailsComponent {
  employeeService = inject(EmployeeService);
  adminService = inject(AdminService);
  router = inject(Router);
  employees: any = [];
  ngOnInit() {
    this.getEmployeeInfo();
  }
  getEmployeeInfo() {
    this.employeeService.getEmployeeInfo().subscribe((res: any) => {
      this.employees = res.employee;
    });
  }
  addBankDetailsRoute(id: string) {
    this.router.navigate(['/admin/update-bank-details', id]);
  }
}
