import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  adminService=inject(AdminService);
  showCurrentPassword:boolean=false
  showNewPassword:boolean=false
  showConfirmPassword:boolean=false
  private fb=new FormBuilder

  changePasswordForm=this.fb.group({
    currentPassword:['',Validators.required],
    newPassword:['',[Validators.required,Validators.max(6)]],
    confirmPassword:['',Validators.required]
  })

  changePassord(){
    this.adminService.changePassword(this.changePasswordForm.value.currentPassword!,this.changePasswordForm.value.newPassword!,this.changePasswordForm.value.confirmPassword!).subscribe((res:any)=>{
      if(res){
        alert(res.message)
        this.changePasswordForm.reset();
      }
      else{
        console.error("There is some error")
      }
    })
    
  }
  

}
