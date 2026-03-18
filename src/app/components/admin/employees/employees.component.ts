import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees',
  imports: [RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  adminService=inject(AdminService)
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


}
