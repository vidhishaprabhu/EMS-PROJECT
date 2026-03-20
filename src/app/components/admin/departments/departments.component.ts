import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  imports: [],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {

  departements:any=[];
  adminService=inject(AdminService)
  router=inject(Router)

  ngOnInit(){
    this.getAllEmp();

  }
  getAllEmp(){
    this.adminService.getAllDept().subscribe((res:any)=>{
      this.departements=res.department;
      console.log(this.departements)
    })
  }
  deleteDepartment(id:string){
    this.adminService.deleteDepartment(id).subscribe((res:any)=>{
      alert(res.message);
      this.getAllEmp()
    })
  }
  addDept(){
    this.router.navigate(['/admin/add-department'])
  }

  editDepartment(id:string){
    this.router.navigate(['/admin/add-department',id]);
  }
  

}
