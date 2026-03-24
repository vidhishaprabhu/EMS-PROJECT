import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../services/dashboard/employee.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-leave',
  imports: [DatePipe],
  templateUrl: './my-leave.component.html',
  styleUrl: './my-leave.component.css'
})
export class MyLeaveComponent {
  employeeService=inject(EmployeeService);
  router=inject(Router)
  
  leaves:any=[]
  
  ngOnInit(){
    this.getLeaveInfo()
  }

  getLeaveInfo(){
    this.employeeService.getLeaveInfo().subscribe((res:any)=>{
      console.log("dsdfdf",res)
      this.leaves = Object.values(res.leave);
      

    })
  }
  addNewLeave(){
    this.router.navigate(['/employee/add-my-leave-form'])
  }

}
