import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/dashboard/employee.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  adminService=inject(AdminService);
  employeeService=inject(EmployeeService)
  showCurrentPassword:boolean=false
  showNewPassword:boolean=false
  showConfirmPassword:boolean=false
  route=inject(ActivatedRoute)
  router=inject(Router)
  private fb=new FormBuilder

  role:string='admin'
  changePasswordForm=this.fb.group({
    currentPassword:['',Validators.required],
    newPassword:['',[Validators.required,Validators.max(6)]],
    confirmPassword:['',Validators.required]
  })

  ngOnInit(){
    this.role=this.route.snapshot.data['role']
  }

  changePassord(){
     if (this.changePasswordForm.invalid) return; 

    const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

    const request = this.role === 'admin'
      ? this.adminService.changePassword(currentPassword!, newPassword!, confirmPassword!)
      : this.employeeService.changePassword(currentPassword!, newPassword!, confirmPassword!);

    request.subscribe({
      next: (res: any) => {
        alert(res.message);
        this.changePasswordForm.reset();
        this.role === 'admin'
          ? this.router.navigate(['/admin/dashboard'])
          : this.router.navigate(['/employee/employee-dashboard']);
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
    
  }
  

}
