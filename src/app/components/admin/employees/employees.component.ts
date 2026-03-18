import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';

@Component({
  selector: 'app-employees',
  imports: [],
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
