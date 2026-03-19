import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-employee',
  imports: [DatePipe],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent {

  adminService=inject(AdminService);
  employees:any=[]
  route=inject(ActivatedRoute)
  ngOnInit(){
    const id=this.route.snapshot.paramMap.get('id')
    this.adminService.getEmployeeById(id!).subscribe((res:any)=>{
      this.employees=res.employee
      console.log("fdfdfd",this.employees)
    })

  }
  


}
