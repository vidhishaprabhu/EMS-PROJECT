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
  currentPage: number = 1;
  itemsPerPage: number = 2;
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
      this.currentPage = 1;
    })
  }

  searchDepartment() {
  if (!this.searchId) {
    this.filteredDepartment = this.departements;
    this.nodatafound = false;
    this.currentPage = 1; // 🔥 important
    return;
  }

  this.filteredDepartment = this.departements.filter((emp: any) =>
    emp.name
      ?.toLowerCase()
      .includes(this.searchId.trim().toLowerCase())
  );

  this.nodatafound = this.filteredDepartment.length === 0;

  this.currentPage = 1; // 🔥 reset page
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

  get totalPages() {
    return Math.ceil(this.filteredDepartment.length / this.itemsPerPage) || 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  get paginatedLeaves() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredDepartment.slice(start, end);
  }
  

}
