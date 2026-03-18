import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../../services/dashboard/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  private fb = inject(FormBuilder);
  adminService=inject(AdminService)
  router=inject(Router)
  department:any=[]
  employeeForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.max(7)]],
    department: ['', Validators.required],
    position: ['', Validators.required],
    role: ['', Validators.required],
    employeePhoto: ['', Validators.required],
  });

  ngOnInit(){
    this.getAllDept()
  }
  getAllDept(){
    this.adminService
      .getAllDept()
      .subscribe((res: any) => {
        if (res) {
          this.department=res.department
        } else {
          console.error('There is some error');
        }
      });
  }
  addEmployee(){
  this.adminService
      .addEmployees(this.employeeForm.value.name!, this.employeeForm.value.email!,this.employeeForm.value.password!,this.employeeForm.value.department!,this.employeeForm.value.position!,this.employeeForm.value.role!,this.employeeForm.value.employeePhoto!)
      .subscribe((res: any) => {
        if (res) {
          alert(res.message);
          this.router.navigateByUrl('/admin/get-all-employee')
        } else {
          console.error('There is some error');
        }
      });
  }
}
