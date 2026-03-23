import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-salaries',
  imports: [],
  templateUrl: './salaries.component.html',
  styleUrl: './salaries.component.css'
})
export class SalariesComponent {
  adminService=inject(AdminService)
  department:any=[]
  employees:any=[]
  private fb=inject(FormBuilder);
  salaryForm=this.fb.group({
    
  })
  ngOnInit(){
    this.getAllDept()
    this.getAllEmp()
  }
  getAllEmp(){
    this.adminService.getAllEmployee().subscribe((res: any) => {
      if (res) {
        this.employees = res.department;
      } else {
        console.error('There is some error');
      }
    });
  }
  getAllDept() {
    this.adminService.getAllDept().subscribe((res: any) => {
      if (res) {
        this.department = res.department;
      } else {
        console.error('There is some error');
      }
    });
  }
  addSalary(){

  }

}
