import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../services/dashboard/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-department',
  imports: [ReactiveFormsModule],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css'
})
export class AddDepartmentComponent {
  private fb=inject(FormBuilder);
  adminService=inject(AdminService)
  router=inject(Router)
  route=inject(ActivatedRoute)
  departments:any=[]
  id:string=''
  isEdit:boolean=false
  departmentForm=this.fb.group({
    name:['',Validators.required],
    description:['',Validators.required]
  })

  ngOnInit(){
    this.getAllDept();
    this.editDept();

    const id=this.route.snapshot.paramMap.get('id')
    this.isEdit=!!id
    if(this.isEdit===true){
      this.editDept();
    }
    
  }
  editDept(){
    const id=this.route.snapshot.paramMap.get('id')
    this.adminService.getDepartmentById(id!).subscribe((res:any)=>{
      this.departments=res.department
      this.departmentForm.patchValue({
      name:this.departments.name,
      description:this.departments.description
    })
    this.id=this.departments._id

    })
    
    
  }
  addDepartment(){
    console.log(this.departmentForm.value)
    if(this.isEdit===false){
      this.adminService.addDepartment(this.departmentForm.value.name!,this.departmentForm.value.description!).subscribe((res:any)=>{
       if (res) {
            alert(res.message);
            this.router.navigateByUrl('/admin/get-all-department');
          } else {
            console.error('There is some error');
          }
    })
    }
    else{
      this.adminService.updateDepartment(this.id,this.departmentForm.value.name!,this.departmentForm.value.description!).subscribe((res:any)=>{
        alert(res.message);
        this.getAllDept();
        this.router.navigate(['/admin/get-all-department'])
      })
    }
  }

  getAllDept() {
    this.adminService.getAllDept().subscribe((res: any) => {
      if (res) {
        this.departments = res.department;
      } else {
        console.error('There is some error');
      }
    });
  }


}
