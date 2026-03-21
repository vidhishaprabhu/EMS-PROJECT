import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/dashboard/admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-leave',
  imports: [DatePipe],
  templateUrl: './view-leave.component.html',
  styleUrl: './view-leave.component.css'
})
export class ViewLeaveComponent {
  leaves:any=[]
  route=inject(ActivatedRoute)
  adminService=inject(AdminService)
  ngOnInit(){
    const id=this.route.snapshot.paramMap.get('id')
    this.adminService.getLeaveInfo(id!).subscribe((res:any)=>{
      this.leaves=res.leave
      console.log("Leavvxcvcvcve",this.leaves)
    })

  }

}
