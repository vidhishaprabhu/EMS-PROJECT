import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/dashboard/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments',
  imports: [FormsModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {

  departements:any=[];
  filteredDepartment:any=[]
  searchId:string=''
  nodatafound:boolean=false
  adminService=inject(AdminService)
  router=inject(Router)

  ngOnInit(){
    this.getAllEmp();

  }
  getAllEmp(){
    this.adminService.getAllDept().subscribe((res:any)=>{
      this.departements=res.department;
      this.filteredDepartment=res.department;
      console.log(this.departements)
    })
  }

  searchDepartment() {
  if (!this.searchId) {
    this.filteredDepartment = this.departements;
    this.nodatafound = false; 
    return;
  }
  this.filteredDepartment = this.departements.filter((emp: any) =>
    emp.name.toLowerCase().includes(this.searchId.toLowerCase())
  );

  if (this.filteredDepartment.length === 0) {
    this.nodatafound = true;
  } else {
    this.nodatafound = false;
  }
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
