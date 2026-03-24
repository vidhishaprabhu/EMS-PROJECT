import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  private fb=inject(FormBuilder);
  authService=inject(AuthService);
  showNewPassword:boolean=false;
  showConfirmPassword:boolean=false;

  forgetPasswordForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    newPassword:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',Validators.required]
  })

  forgetPassword(){
    this.authService.forgetPasswordEmployee(this.forgetPasswordForm.value.email!,this.forgetPasswordForm.value.newPassword!,this.forgetPasswordForm.value.confirmPassword!).subscribe((res:any)=>{
      if(res){
        alert(res.message);
      }
      else{
        console.error("There is some error");
      }
    })
  }

}
