import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/dashboard/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-myleave-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-myleave-form.component.html',
  styleUrl: './add-myleave-form.component.css'
})
export class AddMyleaveFormComponent {
  private fb=new FormBuilder
  employeeService=inject(EmployeeService)
  router=inject(Router)
  myleaveForm=this.fb.group({
    employee:['',Validators.required],
    fromDate:['',Validators.required],
    toDate:['',Validators.required],
    leaveType:['',Validators.required],
    reason:['',Validators.required]
  })

  addMyLeave(){
    this.employeeService.addLeave(this.myleaveForm.value.employee!,this.myleaveForm.value.fromDate!,this.myleaveForm.value.toDate!,this.myleaveForm.value.leaveType!,this.myleaveForm.value.reason!).subscribe((res:any)=>{
      if(res){
        alert(res.message)
        this.myleaveForm.reset()
        this.router.navigate(['/employee/my-leaves'])
      }
      else{
        console.error('There is some error');
      }
    })
  }

}
