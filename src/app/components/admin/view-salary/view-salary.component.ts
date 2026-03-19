import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/dashboard/admin.service';

@Component({
  selector: 'app-view-salary',
  imports: [],
  templateUrl: './view-salary.component.html',
  styleUrl: './view-salary.component.css'
})
export class ViewSalaryComponent {
  salaries:any=[]
  route=inject(ActivatedRoute)
  adminService=inject(AdminService)
  ngOnInit(){
    const id=this.route.snapshot.paramMap.get('id');
    this.adminService.getSalaryById(id!).subscribe((res:any)=>{
      this.salaries=res.salary;
      console.log("hjjhcdc",this.salaries);
    })


  }
}
