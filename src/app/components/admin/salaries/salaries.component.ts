import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';

@Component({
  selector: 'app-salaries',
  imports: [ReactiveFormsModule],
  templateUrl: './salaries.component.html',
  styleUrl: './salaries.component.css',
})
export class SalariesComponent {
  adminService = inject(AdminService);
  department: any = [];
  employees: any = [];
  private fb = inject(FormBuilder);
  salaryForm = this.fb.group({
    department: ['', Validators.required],
    employee: ['', Validators.required],
    basic: ['', Validators.required],
    bonus: ['', Validators.required],
    deduction: ['', Validators.required],
    pf: [0],
  professionalTax: [0],
  incomeTax: [0],
  total: [0]
  });
  ngOnInit() {
    this.getAllDept();
    this.getAllEmp();
  }
  getAllEmp() {
    this.adminService.getAllEmployee().subscribe((res: any) => {
      if (res) {
        this.employees = res.employee;
      } else {
        console.error('There is some error');
      }
    });
  }
  getAllDept() {
    this.adminService.getAllDept().subscribe((res: any) => {
      if (res) {
        this.department = res.department;
      } else {
        console.error('There is some error');
      }
    });
  }
  createSalary() {
  
  
  this.adminService.addSalaries(this.salaryForm.value.employee!,this.salaryForm.value.basic!,this.salaryForm.value.bonus!,this.salaryForm.value.department!,this.salaryForm.value.deduction!)
    .subscribe({
      next: (res: any) => {
        this.salaryForm.patchValue({
          pf: res.salary.pf,
          professionalTax: res.salary.professionalTax,
          incomeTax: res.salary.incomeTax,
          total: res.salary.total
        });
        alert(res.message);
      },
      error: (err) => alert(err.error.message)
    });
}
}
