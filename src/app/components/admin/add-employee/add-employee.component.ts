import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../../services/dashboard/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  private fb = inject(FormBuilder);
  adminService = inject(AdminService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  employee: any = [];
  department: any = [];
  isEdit: boolean = false;
  selectedEmployee: any = null;
  id: string = '';
  employeeForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.max(7)]],
    department: ['', Validators.required],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    position: ['', Validators.required],
    role: ['', Validators.required],
    employeePhoto: ['', Validators.required],
  });

  ngOnInit() {
    this.getAllDept();
    this.editEmployee();
    const id = this.route.snapshot.paramMap.get('id');

    this.isEdit = !!id;

    if (this.isEdit) {
      this.employeeForm.get('password')?.disable();
    } else {
      this.employeeForm.get('password')?.enable();
    }
  }
  editEmployee() {
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.getEmployeeById(id!).subscribe((res: any) => {
      this.employee = res.employee;
      console.log('Edit', this.employee);
      this.employeeForm.patchValue({
        name: this.employee.name,
        email: this.employee.email,
        department: this.employee.department._id,
        gender: this.employee.gender,
        dateOfBirth: this.formatDate(this.employee.dateOfBirth),
        position: this.employee.position,
        role: this.employee.role,
        employeePhoto: this.employee.image,
      });
      this.id = this.employee._id;
    });
  }
  formatDate(date: string) {
    return new Date(date).toISOString().split('T')[0];
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
  addEmployee() {
    if (this.isEdit === false) {
      this.adminService
        .addEmployees(
          this.employeeForm.value.name!,
          this.employeeForm.value.email!,
          this.employeeForm.value.password!,
          this.employeeForm.value.department!,
          this.employeeForm.value.position!,
          this.employeeForm.value.role!,
          this.employeeForm.value.employeePhoto!,
          this.employeeForm.value.gender!,
          this.employeeForm.value.dateOfBirth!,
        )
        .subscribe((res: any) => {
          if (res) {
            alert(res.message);
            this.router.navigateByUrl('/admin/get-all-employee');
          } else {
            console.error('There is some error');
          }
        });
    } else {
      this.adminService
        .updateEmployee(
          this.id,
          this.employeeForm.value.name!,
          this.employeeForm.value.email!,
          this.employeeForm.value.department!,
          this.employeeForm.value.position!,
          this.employeeForm.value.employeePhoto!,
          this.employeeForm.value.gender!,
          this.employeeForm.value.dateOfBirth!,
        )
        .subscribe((res: any) => {
          if (res) {
            alert(res.message);
            this.router.navigateByUrl('/admin/get-all-employee');
          } else {
            console.error('There is some error');
          }
        });
    }
  }
}
