import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employees',
  imports: [RouterLink,DatePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  adminService=inject(AdminService)
  router=inject(Router)
  employees:any=[]
  ngOnInit(){
    this.getAllEmployees();

  }
  getAllEmployees(){
    this.adminService.getAllEmployee().subscribe((res:any)=>{
      this.employees=res.employee
      console.log(this.employees)

    })
  }
  viewEmployee(id:string){
    this.router.navigate(['/admin/view-employee',id])

  }


}
